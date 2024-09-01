import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DesktopList from './DesktopList';
import MobileList from './MobileList';
import DeleteConfirmationModal from './DeleteConfirmationModal';

const JobList = ({ jobs, onEdit, onDelete }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [jobToDelete, setJobToDelete] = useState(null);

    const openModal = (job) => {
        setJobToDelete(job);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setJobToDelete(null);
    };

    const confirmDelete = () => {
        if (jobToDelete) {
            onDelete(jobToDelete._id);
            closeModal();
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        >
            <motion.h2
                className="text-2xl font-bold text-gray-900 mb-6"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Job Applications
            </motion.h2>
            <AnimatePresence>
                {jobs.length > 0 ? (
                    <motion.div
                        key="job-lists"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="hidden sm:block">
                            <DesktopList jobs={jobs} onEdit={onEdit} openModal={openModal} />
                        </div>
                        <div className="sm:hidden">
                            <MobileList jobs={jobs} onEdit={onEdit} openModal={openModal} />
                        </div>
                    </motion.div>
                ) : (
                    <motion.p
                        key="no-jobs"
                        className="text-gray-500 text-center py-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        No job applications yet. Start by adding a new job!
                    </motion.p>
                )}
            </AnimatePresence>
            <DeleteConfirmationModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                jobToDelete={jobToDelete}
                onConfirm={confirmDelete}
            />
        </motion.div>
    );
};

export default JobList;