import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Layout = () => {
    const isLoggedIn = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    };

    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-blue-600 text-white p-4">
                <h1 className="text-2xl font-bold">Job Tracker</h1>
                <nav className="mt-2">
                    {isLoggedIn ? (
                        <>
                            <Link to="/" className="text-white hover:text-gray-300 mx-2">Home</Link>
                            <Link to="/add" className="text-white hover:text-gray-300 mx-2">Add Job</Link>
                            <Link to="/dashboard" className="text-white hover:text-gray-300 mx-2">Dashboard</Link>
                            <button onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/" className="text-white hover:text-gray-300 mx-2">Home</Link>
                            <Link to="/register" className="text-white hover:text-gray-300 mx-2">Register</Link>
                            <Link to="/login" className="text-white hover:text-gray-300 mx-2">Login</Link>
                        </>
                    )}
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
