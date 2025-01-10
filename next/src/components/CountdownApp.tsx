"use client";

import { useState, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CountdownTimer from "./CountdownTimer";
import CountdownForm from "./CountdownForm";
import CountdownList from "./CountdownList";
import CountdownSearch from "./CountdownSearch";
import PomodoroTimer from "./PomodoroTimer";
import { Countdown } from "../types/countdown";
import { useTheme } from "../hooks/useTheme";
import { useCountdownActions } from "../hooks/useCountdownActions";
import { Sun, Moon, Clock } from "lucide-react";

export default function CountdownApp() {
	const [countdowns, setCountdowns] = useState<Countdown[]>([]);
	const [activeCountdown, setActiveCountdown] = useState<Countdown | null>(
		null
	);
	const [isEditing, setIsEditing] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [showPomodoro, setShowPomodoro] = useState(false);
	const { theme, toggleTheme } = useTheme();
	const { addCountdown, updateCountdown, deleteCountdown } =
		useCountdownActions(setCountdowns, setActiveCountdown);

	useEffect(() => {
		const savedCountdowns = localStorage.getItem("countdowns");
		if (savedCountdowns) {
			try {
				const parsedCountdowns = JSON.parse(savedCountdowns);
				setCountdowns(parsedCountdowns);
				setActiveCountdown(parsedCountdowns[0] || null);
			} catch (error) {
				console.error("Error parsing saved countdowns:", error);
				setCountdowns([]);
			}
		}
	}, []);

	useEffect(() => {
		try {
			localStorage.setItem("countdowns", JSON.stringify(countdowns));
		} catch (error) {
			console.error("Error saving countdowns:", error);
		}
	}, [countdowns]);

	const filteredCountdowns = useMemo(() => {
		return countdowns.filter(
			(countdown) =>
				countdown.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				new Date(countdown.date).toLocaleDateString().includes(searchTerm)
		);
	}, [countdowns, searchTerm]);

	return (
		<div
			className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 sm:p-6 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto transition-colors duration-200 ${
				theme === "dark" ? "dark" : ""
			}`}
		>
			<div className="flex justify-between items-center mb-6">
				<button
					onClick={toggleTheme}
					className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors rounded-md p-2"
					aria-label={
						theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
					}
				>
					{theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
				</button>
				<button
					onClick={() => setShowPomodoro(!showPomodoro)}
					className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors rounded-md p-2"
					aria-label="Toggle Pomodoro Timer"
				>
					<Clock size={24} />
				</button>
			</div>

			{showPomodoro && <PomodoroTimer />}

			<div className="mb-6">
				<CountdownForm
					onAddCountdown={addCountdown}
					onUpdateCountdown={updateCountdown}
					initialData={isEditing ? activeCountdown : null}
					onCancel={() => setIsEditing(false)}
				/>
			</div>

			<AnimatePresence mode="wait">
				<motion.div
					key={activeCountdown ? activeCountdown.id : "empty"}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					transition={{ duration: 0.3 }}
					className="mb-6"
				>
					{activeCountdown && (
						<CountdownTimer
							countdown={activeCountdown}
							onDelete={deleteCountdown}
							onEdit={() => setIsEditing(true)}
						/>
					)}
				</motion.div>
			</AnimatePresence>

			<CountdownSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />

			<CountdownList
				countdowns={filteredCountdowns}
				activeCountdownId={activeCountdown?.id}
				onSelect={setActiveCountdown}
			/>
		</div>
	);
}
