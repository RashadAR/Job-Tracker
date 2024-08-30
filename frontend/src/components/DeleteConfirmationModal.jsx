import Modal from 'react-modal';

// Set the app element for accessibility
Modal.setAppElement('#root');

const DeleteConfirmationModal = ({ isOpen, onRequestClose, jobToDelete, onConfirm }) => {
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            maxWidth: '400px',
            width: '90%',
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            contentLabel="Delete Confirmation"
        >
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-6">
                Are you sure you want to delete the job application for{' '}
                <span className="font-semibold">{jobToDelete?.title}</span> at{' '}
                <span className="font-semibold">{jobToDelete?.company}</span>?
            </p>
            <div className="flex justify-end space-x-4">
                <button
                    onClick={onRequestClose}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={onConfirm}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                    Delete
                </button>
            </div>
        </Modal>
    );
};

export default DeleteConfirmationModal;