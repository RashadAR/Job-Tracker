const express = require('express');
const Job = require('../models/Job');
const auth = require('../middleware/auth');
const router = express.Router();

// Create a new job application
router.post('/', auth, async (req, res) => {
    const { title, company, status, interviewDate } = req.body;

    try {
        const job = new Job({ title, company, status, interviewDate, user: req.user.id });
        await job.save();
        res.status(201).send(job);
    } catch (error) {
        res.status(400).send({ message: 'Error adding job', error });
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
    const { title, company, status, interviewDate } = req.body;

    try {
        const job = await Job.findByIdAndUpdate(
            req.params.id,
            { title, company, status, interviewDate },
            { new: true, user: req.user.id }
        );

        if (!job) {
            return res.status(404).send({ message: 'Job not found' });
        }

        res.send(job);
    } catch (error) {
        res.status(400).send({ message: 'Error updating job', error });
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

// Job Recommendation
router.get('/recommendations', auth, async (req, res) => {
    try {

        // Get all jobs and jobs applied by the user
        const allJobs = await Job.find();
        const userJobs = await Job.find({ user: req.user._id });

        if (!allJobs || !userJobs) {
            console.error('Error fetching jobs: All jobs or user jobs are missing.');
            return res.status(500).json({ message: 'Error fetching jobs' });
        }

        const userSkills = new Set();
        userJobs.forEach((job) => {
            if (job.skills) {
                job.skills.forEach((skill) => userSkills.add(skill));
            }
        });

        const recommendedJobs = allJobs.filter((job) =>
            job.skills && job.skills.some((skill) => userSkills.has(skill))
        );

        res.status(200).send(recommendedJobs);
    } catch (error) {
        console.error('Error fetching recommendations:', error.message);
        res.status(500).send({ message: 'Error fetching recommendations', error: error.message });
    }
});

module.exports = router;
