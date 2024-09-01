// src/pages/AddJobPage.js
import { useNavigate } from 'react-router-dom';
import api from "../utils/api";
import JobForm from '../components/JobForm';
import { useState } from 'react';

const AddJobPage = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (jobData) => {
        try {
            const response = await api.post('/jobs', jobData);
            console.log('Job added successfully:', response.data);
            navigate('/dashboard');
        } catch (error) {
            console.error('Error adding job:', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                setError(`Error: ${error.response.data.message}. ${error.response.data.error || ''}`);
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-6">Add a New Job Application</h2>
            {error && <div className="text-red-500">{error}</div>}
            <JobForm onSubmit={handleSubmit} />
        </div>
    );
};

export default AddJobPage;