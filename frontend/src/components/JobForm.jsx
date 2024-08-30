import React, { useState } from 'react';
import { convertDateToISO } from '../utils/job';
import api from '../utils/api';

const JobForm = ({ initialData = {}, onSubmit }) => {
    const [title, setTitle] = useState(initialData.title || '');
    const [company, setCompany] = useState(initialData.company || '');
    const [status, setStatus] = useState(initialData.status || 'Applied');
    const [interviewDate, setInterviewDate] = useState(initialData.interviewDate || '');
    const [description, setDescription] = useState(initialData.description || '');
    const [extractedSkills, setExtractedSkills] = useState([]);
    const [requiredSkills, setRequiredSkills] = useState(initialData.requiredSkills || []);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisError, setAnalysisError] = useState(null);

    const analyzeDescription = async () => {
        setIsAnalyzing(true);
        setAnalysisError(null);
        try {
            console.log('Sending request to analyze description:', description);
            const response = await api.post('/jobs/analyze-description', { description });
            console.log('Received response:', response);
            setExtractedSkills(response.data.skills);
        } catch (error) {
            console.error('Error analyzing description:', error);
            console.error('Error details:', error.response ? error.response.data : 'No response data');
            setAnalysisError(error.message || 'Failed to analyze the job description. Please try again.');
        } finally {
            setIsAnalyzing(false);
        }
    };

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
            description,
            skills: extractedSkills,
            requiredSkills
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Job Title</label>
                <input
                    type="text"
                    placeholder='Title of Job'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Company</label>
                <input
                    type="text"
                    placeholder='Company Name'
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                    <option value="Applied">Applied</option>
                    <option value="Interviewing">Interviewing</option>
                    <option value="Offered">Offered</option>
                    <option value="Rejected">Rejected</option>
                </select>
            </div>
            {/* <div>
                <label className="block text-sm font-medium text-gray-700">Required Skills (comma-separated)</label>
                <input
                    type="text"
                    value={requiredSkills.join(', ')}
                    onChange={(e) => setRequiredSkills(e.target.value.split(',').map(skill => skill.trim()))}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div> */}
            <div>
                <label htmlFor="interviewDate" className="block text-sm font-medium text-gray-700">
                    Interview Date:
                </label>
                <input
                    type="datetime-local"
                    id="interviewDate"
                    value={interviewDate}
                    onChange={(e) => setInterviewDate(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Job Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    rows="4"
                    placeholder="Paste the job description here"
                ></textarea>
            </div>
            <div>
                <button
                    type="button"
                    onClick={analyzeDescription}
                    disabled={isAnalyzing || !description}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
                >
                    {isAnalyzing ? 'Analyzing...' : 'Analyze Description'}
                </button>
            </div>
            {extractedSkills.length > 0 && (
                <div>
                    <label className="block text-sm font-medium text-gray-700">Extracted Skills</label>
                    <ul className="mt-1 border border-gray-300 rounded-md p-2">
                        {extractedSkills.map((skill, index) => (
                            <li key={index} className="text-sm text-gray-600">{skill}</li>
                        ))}
                    </ul>
                </div>
            )}
            <div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    {initialData.title ? 'Update Job' : 'Add Job'}
                </button>
            </div>
        </form>
    );
};

export default JobForm;