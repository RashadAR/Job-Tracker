import React, { useState } from 'react';
import api from '../utils/api';

const ResumeUpload = () => {
    const [file, setFile] = useState(null);
    const [skills, setSkills] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setError(null);
    };

    const handleUpload = async () => {
        if (!file) {
            setError('Please select a file to upload');
            return;
        }

        setIsLoading(true);
        const formData = new FormData();
        formData.append('resume', file);

        try {
            console.log('Uploading file:', file.name);
            const response = await api.post('/jobs/upload-resume', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log('Server response:', response.data);
            if (response.data && response.data.skills) {
                setSkills(response.data.skills);
                setError(null);
            } else {
                throw new Error('Unexpected server response');
            }
        } catch (error) {
            console.error('Error uploading resume:', error);
            setError(`Error uploading resume: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOptimizeResume = async () => {
        if (skills.length === 0) {
            setError('Please upload and analyze a resume first');
            return;
        }

        setIsLoading(true);
        try {
            const response = await api.post('/jobs/optimize-resume', { resumeSkills: skills });
            if (Array.isArray(response.data) && response.data.length > 0) {
                setSuggestions(response.data);
                setError(null);
            } else {
                throw new Error('Unexpected response format');
            }
        } catch (error) {
            console.error('Error optimizing resume:', error);
            setError('Error optimizing resume. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Upload Your Resume</h2>
            <input
                type="file"
                onChange={handleFileChange}
                className="mb-4 p-2 w-full border rounded"
                accept=".pdf,.doc,.docx,.txt"
            />
            <button
                onClick={handleUpload}
                className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
                disabled={isLoading}
            >
                {isLoading ? 'Processing...' : 'Upload and Analyze'}
            </button>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {skills.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-xl font-bold mb-2">Extracted Skills:</h3>
                    <ul className="list-disc pl-5 mb-4">
                        {skills.map((skill, index) => (
                            <li key={index} className="mb-1">{skill}</li>
                        ))}
                    </ul>
                    <button
                        onClick={handleOptimizeResume}
                        className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Optimizing...' : 'Get Optimization Suggestions'}
                    </button>
                </div>
            )}
            {suggestions.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-xl font-bold mb-2">Job Matches:</h3>
                    <ul className="list-disc pl-5">
                        {suggestions.map((suggestion, index) => (
                            <li key={index} className="mb-2">
                                <strong>{suggestion.jobTitle}</strong> (Match: {suggestion.matchPercentage}%)
                                <br />
                                Missing skills: {suggestion.missingSkills.join(', ') || 'None'}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ResumeUpload;