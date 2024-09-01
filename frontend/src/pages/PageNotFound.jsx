import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PageNotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-gray-100 text-gray-800">
            <motion.h1
                className="text-8xl font-extrabold text-blue-600 mb-4"
            >
                404
            </motion.h1>
            <motion.p
                className="text-2xl mb-6"
            >
                Oops! The page you're looking for doesn't exist.
            </motion.p>
            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                <Link
                    to="/"
                    className="px-6 py-2 text-lg font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                >
                    Go back to Home
                </Link>
            </motion.div>
        </div>
    );
};

export default PageNotFound;
