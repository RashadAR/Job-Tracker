const StatusFilter = ({ value, onChange }) => {
    return (
        <div className="mb-4 sm:mb-8 w-auto">
            <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700">
                Filter by Status:
            </label>
            <select
                id="statusFilter"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="mt-1 w-auto rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
            >
                <option value="All">All</option>
                <option value="Applied">Applied</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Offered">Offered</option>
                <option value="Rejected">Rejected</option>
            </select>
        </div>
    );
};

export default StatusFilter;
