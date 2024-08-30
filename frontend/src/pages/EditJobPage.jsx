// src/pages/EditJobPage.js

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from "../utils/api";
import JobForm from '../components/JobForm';
import { formatDateForInput } from '../utils/job';

const EditJobPage = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await api.get(`/jobs/${id}`);
                setJob({
                    ...response.data,
                    interviewDate: formatDateForInput(response.data.interviewDate)
                });
            } catch (error) {
                console.error('Error fetching job:', error);
            }
        };

        fetchJob();
    }, [id]);

    const handleSubmit = async (jobData) => {
        try {
            await api.put(`/jobs/${id}`, jobData);
            navigate('/dashboard');
        } catch (error) {
            console.error('Error updating job:', error);
        }
    };

    if (!job) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">Edit Job</h2>
            <JobForm initialData={job} onSubmit={handleSubmit} />
        </div>
    );
};

export default EditJobPage;