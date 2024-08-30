const express = require('express');
const Job = require('../models/Job');
const auth = require('../middleware/auth');
const multer = require('multer');
const fs = require('fs').promises;
const natural = require('natural');
const pdf = require('pdf-parse');
const router = express.Router();
const upload = multer({ dest: 'uploads/' });
const { spawn } = require('child_process');

// Helper function to extract skills from job description
function extractSkillsFromDescription(description) {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python', ['nlp_analyze.py', description]);
        let output = '';

        pythonProcess.stdout.on('data', (data) => {
            output += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            console.error('Python script error:', data.toString());
        });

        pythonProcess.on('close', (code) => {
            if (code !== 0) {
                reject(new Error(`Python process exited with code ${code}`));
            } else {
                try {
                    const skills = JSON.parse(output);
                    resolve(skills);
                } catch (error) {
                    reject(new Error('Error parsing Python script output'));
                }
            }
        });
    });
}

// Create a new job application
router.post('/', auth, async (req, res) => {
    const { title, company, status, interviewDate, description } = req.body;

    try {
        const extractedSkills = await extractSkillsFromDescription(description);
        const job = new Job({
            title,
            company,
            status,
            interviewDate,
            description,
            requiredSkills: extractedSkills,
            user: req.user.id
        });
        await job.save();
        res.status(201).send(job);
    } catch (error) {
        res.status(400).send({ message: 'Error adding job', error: error.message });
    }
});

// Get all job applications
router.get('/', auth, async (req, res) => {
    try {
        const jobs = await Job.find({ user: req.user.id });
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a job application
router.put('/:id', auth, async (req, res) => {
    const { title, company, status, interviewDate, description } = req.body;

    try {
        const extractedSkills = await extractSkillsFromDescription(description);
        const job = await Job.findByIdAndUpdate(
            req.params.id,
            { title, company, status, interviewDate, description, requiredSkills: extractedSkills },
            { new: true, user: req.user.id }
        );

        if (!job) {
            return res.status(404).send({ message: 'Job not found' });
        }

        res.send(job);
    } catch (error) {
        res.status(400).send({ message: 'Error updating job', error: error.message });
    }
});

// Delete a job application
router.delete('/:id', auth, async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete({ _id: req.params.id, user: req.user.id });
        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }
        res.status(200).json({ message: 'Job deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single job application
router.get('/:id', auth, async (req, res) => {
    try {
        const job = await Job.findById({ _id: req.params.id, user: req.user.id });
        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }
        res.status(200).json(job);
    } catch (error) {
        console.error('Error fetching job:', error);
        res.status(500).json({ error: error.message });
    }
});


// Function to extract skills from text
function extractSkillsFromText(text) {
    const skillsList = [
        { name: 'JavaScript', aliases: ['JS'] },
        { name: 'React', aliases: ['ReactJs', 'React.js'] },
        { name: 'Node.js', aliases: ['NodeJs', 'Node'] },
        { name: 'CSS', aliases: [] },
        { name: 'HTML', aliases: ['HTML5'] },
        { name: 'Python', aliases: [] },
        { name: 'Java', aliases: [] },
        { name: 'C++', aliases: [] },
        { name: 'C#', aliases: ['C Sharp'] },
        { name: 'C', aliases: ['C Programming'] },
        { name: 'SQL', aliases: ['MySQL'] },
        { name: 'MongoDB', aliases: [] },
        { name: 'Git', aliases: [] },
        { name: 'REST API', aliases: ['RESTful API', 'RESTful'] },
        { name: 'Express.js', aliases: ['ExpressJs', 'Express'] },
        { name: 'Postman', aliases: [] },
        { name: 'Cyber Security', aliases: ['CyberSecurity'] },
        { name: 'Microsoft Office', aliases: [] },
        { name: 'Bootstrap', aliases: [] }
    ];

    const lowerCaseText = text.toLowerCase();
    const extractedSkills = skillsList.filter(skill =>
        lowerCaseText.includes(skill.name.toLowerCase()) ||
        skill.aliases.some(alias => lowerCaseText.includes(alias.toLowerCase()))
    ).map(skill => skill.name);

    console.log('Extracted skills:', extractedSkills);
    return [...new Set(extractedSkills)]; // Remove duplicates
}

async function extractTextFromPDF(filePath) {
    const dataBuffer = await fs.readFile(filePath);
    const data = await pdf(dataBuffer);
    return data.text;
}

// Helper function to normalize skills
function normalizeSkill(skill) {
    return skill.toLowerCase().replace(/[^a-z0-9]/g, '');
}

router.post('/upload-resume', upload.single('resume'), async (req, res) => {
    console.log('Received upload request');
    try {
        if (!req.file) {
            console.log('No file uploaded');
            return res.status(400).send({ message: 'No file uploaded' });
        }

        console.log('File uploaded:', req.file.originalname);
        const resumePath = req.file.path;
        console.log('Reading file from path:', resumePath);

        let fileContent;
        if (req.file.mimetype === 'application/pdf') {
            fileContent = await extractTextFromPDF(resumePath);
        } else {
            fileContent = await fs.readFile(resumePath, 'utf8');
        }

        const skills = extractSkillsFromText(fileContent);

        // Clean up the uploaded file
        await fs.unlink(resumePath);
        console.log('Temporary file deleted');

        console.log('Sending response with skills:', skills);
        res.send({ skills });
    } catch (err) {
        console.error('Error processing resume:', err);
        res.status(500).send({ message: 'Error processing resume', error: err.message });
    }
});

router.post('/optimize-resume', async (req, res) => {
    try {
        const { resumeSkills } = req.body;
        if (!resumeSkills || !Array.isArray(resumeSkills)) {
            return res.status(400).send({ message: 'Invalid resume skills provided' });
        }

        // Normalize resume skills
        const normalizedResumeSkills = resumeSkills.map(normalizeSkill);

        // Fetch all jobs from the database
        const jobs = await Job.find({}).select('title requiredSkills');

        const suggestions = jobs.map(job => {
            const normalizedJobSkills = (job.requiredSkills || []).map(normalizeSkill);
            const matchingSkills = normalizedJobSkills.filter(skill => normalizedResumeSkills.includes(skill));
            const missingSkills = normalizedJobSkills.filter(skill => !normalizedResumeSkills.includes(skill));
            const matchPercentage = normalizedJobSkills.length > 0
                ? (matchingSkills.length / normalizedJobSkills.length) * 100
                : 0;

            return {
                jobTitle: job.title,
                missingSkills: missingSkills,
                matchPercentage: Math.round(matchPercentage)
            };
        });

        // Sort suggestions by match percentage (highest first)
        suggestions.sort((a, b) => b.matchPercentage - a.matchPercentage);

        res.send(suggestions);
    } catch (err) {
        console.error('Error optimizing resume:', err);
        res.status(500).send({ message: 'Error optimizing resume', error: err.message });
    }
});

// New route for NLP job description analysis
router.post('/analyze-description', (req, res) => {
    const { description } = req.body;
    if (!description) {
        return res.status(400).send({ message: 'Description is required' });
    }

    const pythonProcess = spawn('python', ['nlp_analyze.py', description]);

    pythonProcess.stdout.on('data', (data) => {
        try {
            const skills = JSON.parse(data.toString());
            res.send({ skills });
        } catch (error) {
            console.error('Error parsing Python script output:', error);
            res.status(500).send({ message: 'Error processing job description' });
        }
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error('Python script error:', data.toString());
        res.status(500).send({ message: 'Error analyzing job description' });
    });

    pythonProcess.on('close', (code) => {
        if (code !== 0) {
            console.error(`Python process exited with code ${code}`);
            res.status(500).send({ message: 'Error in Python script execution' });
        }
    });
});

module.exports = router;
