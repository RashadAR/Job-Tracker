// JobList.js
import React, { useState } from 'react';
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
        <>
            <div className="w-full">
                <DesktopList jobs={jobs} onEdit={onEdit} openModal={openModal} />
                <MobileList jobs={jobs} onEdit={onEdit} openModal={openModal} />
            </div>
            <DeleteConfirmationModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                jobToDelete={jobToDelete}
                onConfirm={confirmDelete}
            />
        </>
    );
};

export default JobList;