import React from "react";

interface FilterProps {
	onFilterChange: (filter: string) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
	return (
		<div className="mb-6">
			<select
				onChange={(e) => onFilterChange(e.target.value)}
				className="w-[250px] p-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-600 text-black">
				<option value="">All</option>
				<option value="breakfast">Breakfast</option>
				<option value="lunch">Lunch</option>
				<option value="dinner">Dinner</option>
				<option value="snack">Snack</option>
			</select>
		</div>
	);
};

export default Filter;
