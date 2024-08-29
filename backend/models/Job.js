const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['Applied', 'Interviewing', 'Offered', 'Rejected'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    interviewDate: Date,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    skills: [String]
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
