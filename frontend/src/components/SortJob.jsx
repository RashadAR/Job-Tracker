// src/components/SortJob.jsx
const SortJob = ({ sortCriteria, handleSortChange }) => {
    return (
        <div className="mb-8">
            <label htmlFor="sortCriteria" className="block text-sm font-medium text-gray-700">
                Sort by:
            </label>
            <select
                id="sortCriteria"
                value={sortCriteria}
                onChange={handleSortChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
                <option value="">None</option>
                <option value="Title">Title</option>
                <option value="Company">Company</option>
                <option value="Status">Status</option>
            </select>
        </div>
    );
};

export default SortJob;