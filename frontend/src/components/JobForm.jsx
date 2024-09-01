import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { convertDateToISO } from '../utils/job';

const JobForm = ({ initialData = {}, onSubmit }) => {
    const [title, setTitle] = useState(initialData.title || '');
    const [company, setCompany] = useState(initialData.company || '');
    const [status, setStatus] = useState(initialData.status || 'Applied');
    const [interviewDate, setInterviewDate] = useState(initialData.interviewDate || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !company || !status) {
            alert('Please fill out all required fields.');
            return;
        }
        onSubmit({
            title,
            company,
            status,
            interviewDate: convertDateToISO(interviewDate),
        });
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white p-8 rounded-lg shadow-md max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div whileHover={{ scale: 1.02 }}>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                <input
                    type="text"
                    placeholder='E.g., Software Engineer'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                    required
                />
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }}>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <input
                    type="text"
                    placeholder='E.g., Tech Innovators Inc.'
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                    required
                />
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }}>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                >
                    <option value="Applied">Applied</option>
                    <option value="Interviewing">Interviewing</option>
                    <option value="Offered">Offered</option>
                    <option value="Rejected">Rejected</option>
                </select>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }}>
                <label htmlFor="interviewDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Interview Date
                </label>
                <input
                    type="datetime-local"
                    id="interviewDate"
                    value={interviewDate}
                    onChange={(e) => setInterviewDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                />
            </motion.div>
            <motion.button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ease-in-out"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {initialData.title ? 'Update Job' : 'Add Job'}
            </motion.button>
        </motion.form>
    );
};

export default JobForm;