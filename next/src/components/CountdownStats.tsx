import { useMemo } from "react";
import { Countdown } from "../types/countdown";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
} from "recharts";

interface CountdownStatsProps {
	countdowns: Countdown[];
}

export default function CountdownStats({ countdowns }: CountdownStatsProps) {
	const stats = useMemo(() => {
		const now = new Date();
		const completed = countdowns.filter((c) => new Date(c.date) < now).length;
		const ongoing = countdowns.length - completed;
		const categories: { [key: string]: number } = {};

		countdowns.forEach((countdown) => {
			const category = new Date(countdown.date).toLocaleString("default", {
				month: "long",
			});
			categories[category] = (categories[category] || 0) + 1;
		});

		const categoryData = Object.entries(categories).map(([name, value]) => ({
			name,
			value,
		}));

		return { completed, ongoing, categoryData };
	}, [countdowns]);

	return (
		<div className="text-gray-800 dark:text-gray-200">
			<h2 className="text-2xl font-bold mb-4">Countdown Statistics</h2>
			<div className="grid grid-cols-2 gap-4 mb-6">
				<div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
					<h3 className="text-lg font-semibold">Ongoing</h3>
					<p className="text-3xl font-bold">{stats.ongoing}</p>
				</div>
				<div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg">
					<h3 className="text-lg font-semibold">Completed</h3>
					<p className="text-3xl font-bold">{stats.completed}</p>
				</div>
			</div>
			<h3 className="text-xl font-semibold mb-2">Countdowns by Month</h3>
			<div className="h-64 w-full">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart data={stats.categoryData}>
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Bar dataKey="value" fill="#3b82f6" />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}
