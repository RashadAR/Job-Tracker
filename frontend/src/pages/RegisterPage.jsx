import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../utils/api"

function Register() {
    const [credentials, setCredentials] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear any previous errors

        // Basic client-side validation
        if (!credentials.username || !credentials.password || !credentials.email) {
            setError('Username, Password and Email are required');
            return;
        }

        try {
            const res = await api.post('/auth/register', credentials);
            localStorage.setItem('token', res.data.token);
            navigate('/login');
        } catch (error) {
            console.error('Registration error:', error.response?.data);
            setError(error.response?.data?.message || 'Server error. Please try again later.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                placeholder="Username"
                className="w-full p-2 mb-4 border rounded"
                autoComplete="username"
            />
            <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-2 mb-4 border rounded"
                autoComplete="email"
                required
            />

            <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full p-2 mb-4 border rounded"
                autoComplete="new-password"
            />
            <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">Register</button>
        </form>
    );
}

export default Register;
