// src/pages/AddJobPage.js
import { useNavigate } from 'react-router-dom';
import api from "../utils/api";
import JobForm from '../components/JobForm';

const AddJobPage = () => {
    const navigate = useNavigate();

    const handleSubmit = async (jobData) => {
        try {
            const response = await api.post('/jobs', jobData);
            // console.log('Job added successfully:', response.data);
            navigate('/dashboard');
        } catch (error) {
            console.error('Error adding job:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-6">Add a New Job Application</h2>
            <JobForm onSubmit={handleSubmit} />
        </div>
    );
};

export default AddJobPage;