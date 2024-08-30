import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import "/public/burger.css"

const Layout = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem('token'));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/login');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const NavLinks = ({ mobile = false }) => (
        <div className={`${mobile ? 'flex flex-col' : 'flex items-center space-x-4'}`}>
            {isLoggedIn ? (
                <>
                    <Link to="/" className="py-2 px-4 hover:bg-blue-700 transition duration-300" onClick={mobile ? toggleMenu : undefined}>Home</Link>
                    <Link to="/add" className="py-2 px-4 hover:bg-blue-700 transition duration-300" onClick={mobile ? toggleMenu : undefined}>Add Job</Link>
                    <Link to="/dashboard" className="py-2 px-4 hover:bg-blue-700 transition duration-300" onClick={mobile ? toggleMenu : undefined}>Dashboard</Link>
                    <button onClick={() => { handleLogout(); if (mobile) toggleMenu(); }} className="py-2 px-4 hover:bg-blue-700 transition duration-300 text-left">Logout</button>
                </>
            ) : (
                <>
                    <Link to="/" className="py-2 px-4 hover:bg-blue-700 transition duration-300" onClick={mobile ? toggleMenu : undefined}>Home</Link>
                    <Link to="/register" className="py-2 px-4 hover:bg-blue-700 transition duration-300" onClick={mobile ? toggleMenu : undefined}>Register</Link>
                    <Link to="/login" className="py-2 px-4 hover:bg-blue-700 transition duration-300" onClick={mobile ? toggleMenu : undefined}>Login</Link>
                </>
            )}
        </div>
    );

    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-blue-600 text-white p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Job Tracker</h1>
                    <div className="hidden lg:block">
                        <NavLinks />
                    </div>
                    <button
                        className="lg:hidden focus:outline-none"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <div className={`burger-icon ${isMenuOpen ? 'open' : ''}`}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </button>
                </div>
                <nav className={`lg:hidden mt-4 ${isMenuOpen ? 'block' : 'hidden'}`}>
                    <NavLinks mobile />
                </nav>
            </header>
            <main className="flex-grow p-4">
                <Outlet />
            </main>
            <footer className="bg-gray-800 text-white text-center p-2">
                <p>&copy; 2024 Job Tracker</p>
            </footer>

        </div>
    );
};

export default Layout;