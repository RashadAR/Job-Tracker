import Modal from 'react-modal';

Modal.setAppElement('#root');

const ConfirmationModal = ({ isOpen, onRequestClose, onConfirm }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Confirmation Modal"
            className="Modal"
            overlayClassName="Overlay"
        >
            <h2 className="text-lg font-bold">Confirm Deletion</h2>
            <p>Are you sure you want to delete this job?</p>
            <div className="mt-4 flex justify-end">
                <button
                    onClick={onRequestClose}
                    className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                    Cancel
                </button>
                <button
                    onClick={onConfirm}
                    className="ml-2 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                    Confirm
                </button>
            </div>
        </Modal>
    );
};

export default ConfirmationModal;
