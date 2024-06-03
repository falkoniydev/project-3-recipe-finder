import React, { useState } from "react";

interface SearchProps {
	onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
	const [query, setQuery] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSearch(query);
	};

	return (
		<div>
			<form
				onSubmit={handleSubmit}
				className="mb-6 flex items-center gap-4 flex-wrap">
				<input
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder="Type ingredients here..."
					className="w-[650px] p-2 rounded-lg border-2 border-gray-300 text-black focus:outline-none focus:border-blue-600"
				/>
				<button
					type="submit"
					className=" text-white px-4 py-2 rounded-lg transition duration-300 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-pink-500 hover:to-yellow-500">
					Search
				</button>
			</form>
		</div>
	);
};

export default Search;
