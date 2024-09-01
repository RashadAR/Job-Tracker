import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from "../utils/api";

const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const inputVariants = {
    focus: { scale: 1.02, transition: { duration: 0.2 } }
};

function AuthForm({ isLogin }) {
    const [credentials, setCredentials] = useState(isLogin ?
        { username: '', password: '' } :
        { username: '', email: '', password: '' }
    );
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const endpoint = isLogin ? '/auth/login' : '/auth/register';
            const res = await api.post(endpoint, credentials);
            localStorage.setItem('token', res.data.token);
            navigate(isLogin ? '/dashboard' : '/login');
            if (isLogin) window.location.reload();
        } catch (error) {
            console.error(`${isLogin ? 'Login' : 'Registration'} error:`, error.response?.data);
            setError(error.response?.data?.message || `An error occurred during ${isLogin ? 'login' : 'registration'}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            className="flex items-center justify-center py-4 px-4 sm:px-6 lg:px-8"
            initial="hidden"
            animate="visible"
            variants={formVariants}
        >
            <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg space-y-6">
                <div>
                    <h2 className="text-center text-2xl font-extrabold text-gray-900">
                        {isLogin ? 'Sign in to your account' : 'Create your account'}
                    </h2>
                </div>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm space-y-4">
                        <motion.div variants={inputVariants} whileFocus="focus">
                            <input
                                type="text"
                                name="username"
                                value={credentials.username}
                                onChange={handleChange}
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Username"
                                autoComplete="username"
                            />
                        </motion.div>
                        {!isLogin && (
                            <motion.div variants={inputVariants} whileFocus="focus">
                                <input
                                    type="email"
                                    name="email"
                                    value={credentials.email}
                                    onChange={handleChange}
                                    required
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Email address"
                                    autoComplete="email"
                                />
                            </motion.div>
                        )}
                        <motion.div variants={inputVariants} whileFocus="focus">
                            <input
                                type="password"
                                name="password"
                                value={credentials.password}
                                onChange={handleChange}
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Password"
                                autoComplete={isLogin ? "current-password" : "new-password"}
                            />
                        </motion.div>
                    </div>

                    {error && (
                        <motion.div
                            className="flex items-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >

                            <span className="block sm:inline">{error}</span>
                        </motion.div>
                    )}

                    <div>
                        <motion.button
                            type="submit"
                            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${loading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
                                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                            disabled={loading}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {loading ? (
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <svg className="animate-spin h-5 w-5 text-indigo-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                </span>
                            ) : null}
                            {isLogin ? 'Sign in' : 'Sign up'}
                        </motion.button>
                    </div>
                </form>
                <div className="text-sm text-center">
                    <Link to={isLogin ? "/register" : "/login"} className="font-medium text-indigo-600 hover:text-indigo-500">
                        {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}

export function Login() {
    return <AuthForm isLogin={true} />;
}

export function Register() {
    return <AuthForm isLogin={false} />;
}