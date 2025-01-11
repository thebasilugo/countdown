"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Countdown } from "../types/countdown";
import { formatTimeLeft } from "../utils/timeUtils";
import { Edit2, Trash2 } from "lucide-react";

interface CountdownTimerProps {
	countdown: Countdown;
	onDelete: (id: string) => void;
	onEdit: () => void;
}

export default function CountdownTimer({
	countdown,
	onDelete,
	onEdit,
}: CountdownTimerProps) {
	const [timeLeft, setTimeLeft] = useState(
		formatTimeLeft(new Date(countdown.date))
	);

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft(formatTimeLeft(new Date(countdown.date)));
		}, 1000);

		return () => clearInterval(timer);
	}, [countdown]);

	const totalDuration =
		new Date(countdown.date).getTime() -
		new Date(countdown.createdAt).getTime();
	const remainingTime = new Date(countdown.date).getTime() - Date.now();
	const progress = Math.max(
		0,
		Math.min(100, ((totalDuration - remainingTime) / totalDuration) * 100)
	);

	return (
		<div className="text-center bg-gray-100 dark:bg-gray-700 p-4 sm:p-6 rounded-md shadow-md">
			<h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
				{countdown.name}
			</h2>
			<div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
				{Object.entries(timeLeft)
					.filter(([unit]) => unit !== "total")
					.map(([unit, value]) => (
						<motion.div
							key={unit}
							className="bg-white dark:bg-gray-600 rounded-md p-2 shadow"
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{ duration: 0.3 }}
						>
							<div className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200">
								{value}
							</div>
							<div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
								{unit}
							</div>
						</motion.div>
					))}
			</div>
			<div className="w-full bg-gray-200 dark:bg-gray-600 rounded-md h-2 mb-4">
				<div
					className="bg-blue-500 h-2 rounded-md transition-all duration-500 ease-in-out"
					style={{ width: `${progress}%` }}
				></div>
			</div>
			<div className="flex justify-between mt-4">
				<button
					onClick={() => onDelete(countdown.id)}
					className="bg-red-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md hover:bg-red-600 transition-colors flex items-center text-sm sm:text-base"
				>
					<Trash2 size={16} className="mr-1 sm:mr-2" /> Delete
				</button>
				<button
					onClick={onEdit}
					className="bg-yellow-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md hover:bg-yellow-600 transition-colors flex items-center text-sm sm:text-base"
				>
					<Edit2 size={16} className="mr-1 sm:mr-2" /> Edit
				</button>
			</div>
		</div>
	);
}
