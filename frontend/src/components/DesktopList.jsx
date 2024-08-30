const DesktopList = ({ jobs, onEdit, openModal }) => (
    <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
                <tr>
                    <th className="px-4 py-2 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Job Title
                    </th>
                    <th className="px-4 py-2 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Company
                    </th>
                    <th className="px-4 py-2 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                    </th>
                    <th className="px-4 py-2 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Interview Date
                    </th>
                    <th className="px-4 py-2 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                {jobs.map((job) => (
                    <tr key={job._id}>
                        <td className="px-4 py-2 border-b border-gray-200">{job.title}</td>
                        <td className="px-4 py-2 border-b border-gray-200">{job.company}</td>
                        <td className="px-4 py-2 border-b border-gray-200">{job.status}</td>
                        <td className="px-4 py-2 border-b border-gray-200">
                            {job.interviewDate ? new Date(job.interviewDate).toLocaleString() : 'N/A'}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-200">
                            <button
                                onClick={() => onEdit(job._id)}
                                className="text-blue-500 hover:underline mr-2"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => openModal(job)}
                                className="text-red-500 hover:underline"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default DesktopList;
