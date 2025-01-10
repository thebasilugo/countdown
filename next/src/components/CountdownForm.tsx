"use client";

import { useState, useEffect } from "react";
import { Countdown } from "../types/countdown";
import { motion } from "framer-motion";
import { Calendar, Clock, AlertCircle } from "lucide-react";

interface CountdownFormProps {
	onAddCountdown: (countdown: Countdown) => void;
	onUpdateCountdown: (countdown: Countdown) => void;
	initialData: Countdown | null;
	onCancel: () => void;
}

export default function CountdownForm({
	onAddCountdown,
	onUpdateCountdown,
	initialData,
	onCancel,
}: CountdownFormProps) {
	const [name, setName] = useState("");
	const [date, setDate] = useState("");
	const [time, setTime] = useState("");
	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	useEffect(() => {
		if (initialData) {
			setName(initialData.name);
			const dateObj = new Date(initialData.date);
			setDate(dateObj.toISOString().split("T")[0]);
			setTime(dateObj.toTimeString().split(" ")[0].slice(0, 5));
		} else {
			setName("");
			setDate("");
			setTime("");
		}
	}, [initialData]);

	const validateForm = () => {
		const newErrors: { [key: string]: string } = {};
		if (!name.trim()) newErrors.name = "Name is required";
		if (!date) newErrors.date = "Date is required";
		if (!time) newErrors.time = "Time is required";

		const selectedDate = new Date(`${date}T${time}`);
		if (selectedDate <= new Date())
			newErrors.date = "Date and time must be in the future";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (validateForm()) {
			const countdownData: Countdown = {
				id: initialData ? initialData.id : Date.now().toString(),
				name,
				date: new Date(`${date}T${time}`).toISOString(),
				createdAt: initialData
					? initialData.createdAt
					: new Date().toISOString(),
			};
			if (initialData) {
				onUpdateCountdown(countdownData);
			} else {
				onAddCountdown(countdownData);
			}
			setName("");
			setDate("");
			setTime("");
		}
	};

	return (
		<motion.form
			onSubmit={handleSubmit}
			className="bg-gray-100 dark:bg-gray-700 p-4 sm:p-6 rounded-md shadow-md"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
		>
			<div className="mb-4">
				<label
					htmlFor="name"
					className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
				>
					Countdown Name
				</label>
				<input
					type="text"
					id="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					className={`w-full px-3 py-2 rounded-md shadow-sm focus:ring focus:ring-opacity-50 dark:bg-gray-600 dark:border-gray-500 dark:text-white ${
						errors.name
							? "border-red-500 focus:border-red-500 focus:ring-red-500"
							: "border-gray-300 focus:border-blue-300 focus:ring-blue-200"
					}`}
					required
				/>
				{errors.name && (
					<p className="mt-1 text-sm text-red-500">{errors.name}</p>
				)}
			</div>
			<div className="mb-4">
				<label
					htmlFor="date"
					className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
				>
					Target Date
				</label>
				<div className="relative">
					<Calendar
						className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
						size={20}
					/>
					<input
						type="date"
						id="date"
						value={date}
						onChange={(e) => setDate(e.target.value)}
						className={`w-full pl-10 pr-3 py-2 rounded-md shadow-sm focus:ring focus:ring-opacity-50 dark:bg-gray-600 dark:border-gray-500 dark:text-white ${
							errors.date
								? "border-red-500 focus:border-red-500 focus:ring-red-500"
								: "border-gray-300 focus:border-blue-300 focus:ring-blue-200"
						}`}
						required
					/>
				</div>
				{errors.date && (
					<p className="mt-1 text-sm text-red-500">{errors.date}</p>
				)}
			</div>
			<div className="mb-4">
				<label
					htmlFor="time"
					className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
				>
					Target Time
				</label>
				<div className="relative">
					<Clock
						className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
						size={20}
					/>
					<input
						type="time"
						id="time"
						value={time}
						onChange={(e) => setTime(e.target.value)}
						className={`w-full pl-10 pr-3 py-2 rounded-md shadow-sm focus:ring focus:ring-opacity-50 dark:bg-gray-600 dark:border-gray-500 dark:text-white ${
							errors.time
								? "border-red-500 focus:border-red-500 focus:ring-red-500"
								: "border-gray-300 focus:border-blue-300 focus:ring-blue-200"
						}`}
						required
					/>
				</div>
				{errors.time && (
					<p className="mt-1 text-sm text-red-500">{errors.time}</p>
				)}
			</div>
			{Object.keys(errors).length > 0 && (
				<div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md flex items-center">
					<AlertCircle className="h-5 w-5 mr-2" />
					<p>Please correct the errors above before submitting.</p>
				</div>
			)}
			<div className="flex justify-between">
				<button
					type="submit"
					className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
				>
					{initialData ? "Update" : "Add"} Countdown
				</button>
				{initialData && (
					<button
						type="button"
						onClick={onCancel}
						className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
					>
						Cancel
					</button>
				)}
			</div>
		</motion.form>
	);
}
