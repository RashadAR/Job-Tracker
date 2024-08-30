const MobileList = ({ jobs, onEdit, openModal }) => (
    <div className="md:hidden space-y-4">
        {jobs.map((job) => (
            <div key={job._id} className="bg-white shadow-md rounded-lg p-4">
                <h3 className="font-bold text-lg mb-2">{job.title}</h3>
                <p className="text-gray-600 mb-1">Company: {job.company}</p>
                <p className="text-gray-600 mb-1">Status: {job.status}</p>
                <p className="text-gray-600 mb-2">
                    Interview Date: {job.interviewDate ? new Date(job.interviewDate).toLocaleString() : 'N/A'}
                </p>
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={() => onEdit(job._id)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => openModal(job)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    >
                        Delete
                    </button>
                </div>
            </div>
        ))}
    </div>
);

export default MobileList;
