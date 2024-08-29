import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../utils/api"

function Login() {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true); // Set loading to true when form is submitted

        try {
            const res = await api.post('/auth/login', credentials);
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
            window.location.reload();
        } catch (error) {
            console.error('Login error:', error.response?.data);
            setError(error.response?.data?.message || 'An error occurred during login');
        } finally {
            setLoading(false); // Set loading to false after operation is complete
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                placeholder="Username"
                className="w-full p-2 mb-4 border rounded"
                required
                disabled={loading}
                autoComplete="username"
            />

            <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full p-2 mb-4 border rounded"
                required
                disabled={loading}
                autoComplete="current-password"
            />
            <button
                type="submit"
                className={`w-full p-2 rounded ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                disabled={loading}
            >
                {loading ? 'Logging in...' : 'Login'} {/* Show loading text */}
            </button>
        </form>
    );
}

export default Login;
