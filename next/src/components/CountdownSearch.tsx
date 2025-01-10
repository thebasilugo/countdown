import { Search } from "lucide-react";

interface CountdownSearchProps {
	searchTerm: string;
	onSearchChange: (term: string) => void;
}

export default function CountdownSearch({
	searchTerm,
	onSearchChange,
}: CountdownSearchProps) {
	return (
		<div className="relative mb-4">
			<input
				type="text"
				placeholder="Search countdowns..."
				value={searchTerm}
				onChange={(e) => onSearchChange(e.target.value)}
				className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
			/>
			<Search
				className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
				size={20}
			/>
		</div>
	);
}
