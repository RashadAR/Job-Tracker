import React, { useState, useEffect, useRef } from 'react';
import api from "../utils/api"
import { useNavigate, useParams } from 'react-router-dom';

const EditJobPage = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [status, setStatus] = useState('Applied');
    const [interviewDate, setInterviewDate] = useState('');
    const navigate = useNavigate();
    const effectRan = useRef(false);

    useEffect(() => {
        if (effectRan.current === false) {
            const fetchJob = async () => {
                try {
                    const response = await api.get(`/jobs/${id}`);
                    setTitle(response.data.title);
                    setCompany(response.data.company);
                    setStatus(response.data.status);
                    setInterviewDate(formatDateForInput(response.data.interviewDate));
                    console.log(response.data)
                } catch (error) {
                    console.error('Error fetching job:', error);
                }
            };

            fetchJob();
            return () => {
                effectRan.current = true;
            };
        }
    }, [id]);

    const formatDateForInput = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.put(`/jobs/${id}`, {
                title,
                company,
                status,
                interviewDate: convertDateToISO(interviewDate)
            });
            navigate('/dashboard');
        } catch (error) {
            console.error('Error updating job:', error);
        }
    };

    const convertDateToISO = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toISOString();
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">Edit Job</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Job Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Company</label>
                    <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required>
                        <option value="Applied">Applied</option>
                        <option value="Interviewing">Interviewing</option>
                        <option value="Offered">Offered</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
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
                <button
                    type="submit"
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Update Job
                </button>
            </form>
        </div>
    );
};

export default EditJobPage;
