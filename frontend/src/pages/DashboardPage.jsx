import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../utils/api"

const DashboardPage = () => {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [statusFilter, setStatusFilter] = useState('All');
    // const [sortCriteria, setSortCriteria] = useState('');
    const navigate = useNavigate();
    const jobsRef = useRef(jobs);

    // Get jobs
    useEffect(() => {
        // Fetch jobs and set state
        const fetchJobs = async () => {
            try {
                const response = await api.get('/jobs');
                setJobs(response.data);
                setFilteredJobs(response.data);
            } catch (error) {
                console.error('Error fetching jobs:', error.response ? error.response.data : error.message);
            }
        };
        fetchJobs();
    }, []);

    useEffect(() => {
        // Update the ref whenever the jobs state changes
        jobsRef.current = jobs;
    }, [jobs]);

    // Delete a job
    const handleDelete = async (id) => {
        console.log(`Attempting to delete job with ID: ${id}`);
        const confirmDelete = window.confirm("Are you sure you want to delete this job?");
        if (confirmDelete) {
            try {
                // Perform the delete request
                const response = await api.delete(`/jobs/${id}`);

                // Log the response from the server
                console.log('Delete response:', response.data);

                // Update the job list state using the ref
                const updatedJobs = jobsRef.current.filter((job) => job._id !== id);
                console.log('Updated jobs list:', updatedJobs);
                setJobs(updatedJobs);
                setFilteredJobs(filteredJobs.filter((job) => job._id !== id));
            } catch (error) {
                // Log error details
                console.error('Error deleting job:', error.response ? error.response.data : error.message);
            }
        }
    };

    // Edit a job
    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };

    // Filter Job
    const handleStatusFilterChange = (e) => {
        const selectedStatus = e.target.value;
        setStatusFilter(selectedStatus);
        if (selectedStatus === 'All') {
            setFilteredJobs(jobs);
        } else {
            setFilteredJobs(jobs.filter((job) => job.status === selectedStatus));
        }
    };

    useEffect(() => {
        filteredJobs.forEach((job) => {
            if (job.interviewDate) {
                const interviewTime = new Date(job.interviewDate).getTime();
                const currentTime = new Date().getTime();
                const timeDifference = interviewTime - currentTime;

                if (timeDifference > 0) {
                    setTimeout(() => {
                        alert(`Reminder: Interview for ${job.title} at ${job.company} is coming up!`);
                    }, timeDifference);
                }
            }
        });
    }, [filteredJobs]);


    // Sort Jobs
    // const handleSortChange = (e) => {
    //     const selectedSort = e.target.value;
    //     setSortCriteria(selectedSort);

    //     const sortedJobs = [...filteredJobs].sort((a, b) => {
    //         if (selectedSort === 'Title') {
    //             return a.title.localeCompare(b.title);
    //         } else if (selectedSort === 'Company') {
    //             return a.company.localeCompare(b.company);
    //         } else if (selectedSort === 'Status') {
    //             return a.status.localeCompare(b.status);
    //         }
    //         return 0;
    //     });

    //     setFilteredJobs(sortedJobs);
    // };

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-6">Job Applications</h2>
            {jobs.length === 0 ? (
                <p className="text-center text-gray-500">No job applications yet. Start by adding one!</p>
            ) : (
                <>
                    <div className="mb-8">
                        <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700">
                            Filter by Status:
                        </label>
                        <select
                            id="statusFilter"
                            value={statusFilter}
                            onChange={handleStatusFilterChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                            <option value="All">All</option>
                            <option value="Applied">Applied</option>
                            <option value="Interviewing">Interviewing</option>
                            <option value="Offered">Offered</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>
                    {/* <div className="mb-4">
                        <label htmlFor="sortCriteria" className="block text-sm font-medium text-gray-700">
                            Sort by:
                        </label>
                        <select
                            id="sortCriteria"
                            value={sortCriteria}
                            onChange={handleSortChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                            <option value="">None</option>
                            <option value="Title">Title</option>
                            <option value="Company">Company</option>
                            <option value="Status">Status</option>
                        </select>
                    </div> */}
                    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Job Title
                                </th>
                                <th className="px-4 py-2 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Company
                                </th>
                                <th className="px-4 py-2 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-4 py-2 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Interview Date
                                </th>
                                <th className="px-4 py-2 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredJobs.map((job) => (
                                <tr key={job._id}>
                                    <td className="px-4 py-2 border-b border-gray-200">{job.title}</td>
                                    <td className="px-4 py-2 border-b border-gray-200">{job.company}</td>
                                    <td className="px-4 py-2 border-b border-gray-200">{job.status}</td>
                                    <td className="px-4 py-2 border-b border-gray-200">
                                        {job.interviewDate ? new Date(job.interviewDate).toLocaleString() : 'N/A'}
                                    </td>
                                    <td className="px-4 py-2 border-b border-gray-200">
                                        <button onClick={() => handleEdit(job._id)} className="text-blue-500">Edit</button>
                                        <button onClick={() => handleDelete(job._id)} className="text-red-500 ml-4">Delete</button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default DashboardPage;
