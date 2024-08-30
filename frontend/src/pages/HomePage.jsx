import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
const HomePage = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100
            }
        }
    };

    return (
        <motion.div
            className="container mx-auto px-4 py-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.section className="text-center mb-16" variants={itemVariants}>
                <h1 className="text-4xl font-bold mb-4">Welcome to the Job Tracker</h1>
                <p className="text-xl text-gray-600">
                    Track your job applications and get AI-powered insights.
                </p>
            </motion.section>

            <motion.section className="mb-16" variants={itemVariants}>
                <h2 className="text-3xl font-semibold mb-4">Key Feature</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { title: "Application Tracking", description: "Keep all your job applications organized in one place." },
                    ].map((feature, index) => (
                        <motion.div
                            key={index}
                            className="bg-white p-6 rounded-lg shadow-md"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.section>
            <motion.section className="mb-16" variants={itemVariants}>
                <h2 className="text-3xl font-semibold mb-4">Features Coming Soon</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { title: "AI Insights", description: "Get personalized suggestions to improve your applications." },
                        { title: "Progress Visualization", description: "See your job search progress with intuitive charts." },
                        { title: "Job Alerts", description: "Receive notifications about new job postings matching your profile." },
                        { title: "Resume Builder", description: "Create a professional resume with our easy-to-use builder." },
                        { title: "Interview Prep", description: "Access resources to help you prepare for your interviews." }
                    ].map((feature, index) => (
                        <motion.div
                            key={index}
                            className="bg-white p-6 rounded-lg shadow-md"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            <motion.section className="mb-16" variants={itemVariants}>
                <h2 className="text-3xl font-semibold mb-4">How It Works</h2>
                <ol className="list-decimal list-inside space-y-4 text-lg text-gray-700">
                    <motion.li whileHover={{ x: 5 }}>Sign up for an account</motion.li>
                    <motion.li whileHover={{ x: 5 }}>Add your job applications</motion.li>
                    <motion.li whileHover={{ x: 5 }}>Update application statuses as you progress</motion.li>
                    <motion.li whileHover={{ x: 5 }}>Receive AI-powered suggestions and insights</motion.li>
                    <motion.li whileHover={{ x: 5 }}>Visualize your job search journey</motion.li>
                </ol>
            </motion.section>

            <motion.section variants={itemVariants}>
                <h2 className="text-3xl font-semibold mb-4">Get Started Today</h2>
                <p className="text-xl text-gray-600 mb-6">
                    Join thousands of job seekers who have streamlined their job search process.
                </p>
                <motion.button
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Link to="/register">
                        Sign Up Now
                    </Link>
                </motion.button>
            </motion.section>
        </motion.div>
    );
};

export default HomePage;
