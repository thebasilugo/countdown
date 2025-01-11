"use client";

import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

export default function PomodoroTimer() {
	const [duration, setDuration] = useState(25 * 60); // 25 minutes
	const [remainingTime, setRemainingTime] = useState(duration);
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		let interval: NodeJS.Timeout | null = null;

		if (isActive && remainingTime > 0) {
			interval = setInterval(() => {
				setRemainingTime((time) => time - 1);
			}, 1000);
		} else if (remainingTime === 0) {
			setIsActive(false);
			if ("Notification" in window && Notification.permission === "granted") {
				new Notification("Pomodoro Timer", { body: "Time is up!" });
			}
		}

		return () => {
			if (interval) clearInterval(interval);
		};
	}, [isActive, remainingTime]);

	const toggleTimer = () => {
		setIsActive(!isActive);
	};

	const resetTimer = () => {
		setIsActive(false);
		setRemainingTime(duration);
	};

	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		return `${minutes.toString().padStart(2, "0")}:${seconds
			.toString()
			.padStart(2, "0")}`;
	};

	return (
		<div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md shadow-md mb-6">
			<h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">
				Pomodoro Timer
			</h2>
			<div className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">
				{formatTime(remainingTime)}
			</div>
			<div className="flex justify-center space-x-4">
				<button
					onClick={toggleTimer}
					className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
				>
					{isActive ? <Pause size={24} /> : <Play size={24} />}
				</button>
				<button
					onClick={resetTimer}
					className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 transition-colors"
				>
					<RotateCcw size={24} />
				</button>
			</div>
		</div>
	);
}
