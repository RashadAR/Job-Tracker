import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import "/public/burger.css"
import "/public/layout.css"

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
        <div className={`${mobile ? 'flex flex-col space-y-2' : 'flex items-center space-x-4'}`}>
            {isLoggedIn ? (
                <>
                    <NavLink to="/" onClick={mobile ? toggleMenu : undefined}>Home</NavLink>
                    <NavLink to="/add" onClick={mobile ? toggleMenu : undefined}>Add Job</NavLink>
                    <NavLink to="/dashboard" onClick={mobile ? toggleMenu : undefined}>Dashboard</NavLink>
                    <button onClick={() => { handleLogout(); if (mobile) toggleMenu(); }} className="nav-link">Logout</button>
                </>
            ) : (
                <>
                    <NavLink to="/" onClick={mobile ? toggleMenu : undefined}>Home</NavLink>
                    <NavLink to="/register" onClick={mobile ? toggleMenu : undefined}>Register</NavLink>
                    <NavLink to="/login" onClick={mobile ? toggleMenu : undefined}>Login</NavLink>
                </>
            )}
        </div>
    );

    const NavLink = ({ to, children, onClick }) => (
        <Link
            to={to}
            className="nav-link group relative overflow-hidden"
            onClick={onClick}
        >
            {children}
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
        </Link>
    );

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-3xl font-bold tracking-wide">Job Tracker</h1>
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
            <main className="flex-grow p-4 md:p-8">
                <div className="container mx-auto">
                    <Outlet />
                </div>
            </main>
            <footer className="bg-gray-800 text-white text-center p-4">
                <p>&copy; 2024 Job Tracker | All Rights Reserved</p>
            </footer>
        </div>
    );
};

export default Layout;