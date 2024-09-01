import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../utils/api";

// Lazy load components
const StatusFilter = lazy(() => import('../components/StatusFilter'));
const JobList = lazy(() => import('../components/JobList'));

// Loading component
const Loading = () => <div>Loading...</div>;

const DashboardPage = () => {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [statusFilter, setStatusFilter] = useState('All');
    const navigate = useNavigate();

    const fetchJobs = useCallback(async () => {
        try {
            const response = await api.get('/jobs');
            setJobs(response.data);
            setFilteredJobs(response.data);
        } catch (error) {
            console.error('Error fetching jobs:', error.response ? error.response.data : error.message);
        }
    }, []);

    useEffect(() => {
        fetchJobs();
    }, [fetchJobs]);

    const handleDelete = async (id) => {
        try {
            await api.delete(`/jobs/${id}`);
            await fetchJobs();
        } catch (error) {
            console.error('Error deleting job:', error.response ? error.response.data : error.message);
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };

    const handleStatusFilterChange = (selectedStatus) => {
        setStatusFilter(selectedStatus);
        if (selectedStatus === 'All') {
            setFilteredJobs(jobs);
        } else {
            setFilteredJobs(jobs.filter((job) => job.status === selectedStatus));
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-6">Job Applications</h2>
            {jobs.length === 0 ? (
                <p className="text-center text-gray-500">No job applications yet. Start by adding one!</p>
            ) : (
                <>
                    <Suspense fallback={<Loading />}>
                        <StatusFilter value={statusFilter} onChange={handleStatusFilterChange} />
                        <JobList jobs={filteredJobs} onEdit={handleEdit} onDelete={handleDelete} />
                    </Suspense>
                </>
            )}
        </div>
    );
};

export default DashboardPage;
