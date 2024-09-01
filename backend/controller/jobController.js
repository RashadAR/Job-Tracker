const Job = require('../models/Job');

exports.createJob = async (req, res) => {
    const { title, company, status, interviewDate } = req.body;

    try {
        const job = new Job({
            title,
            company,
            status,
            interviewDate,
            user: req.user.id
        });
        await job.save();

        res.status(201).send(job);
    } catch (error) {
        console.error('Error adding job:', error);
        res.status(400).send({ message: 'Error adding job', error: error.message });
    }
};

exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ user: req.user.id });
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateJob = async (req, res) => {
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
        console.error('Error updating job:', error);
        res.status(400).send({ message: 'Error updating job', error: error.message });
    }
};

exports.deleteJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete({ _id: req.params.id, user: req.user.id });
        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }
        res.status(200).json({ message: 'Job deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getJob = async (req, res) => {
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
};