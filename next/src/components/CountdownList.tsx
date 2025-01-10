import { Countdown } from "../types/countdown";
import { motion, AnimatePresence } from "framer-motion";
import { Clock } from "lucide-react";

interface CountdownListProps {
	countdowns: Countdown[];
	activeCountdownId: string | undefined;
	onSelect: (countdown: Countdown) => void;
}

export default function CountdownList({
	countdowns,
	activeCountdownId,
	onSelect,
}: CountdownListProps) {
	return (
		<div className="mt-6">
			<h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
				Your Countdowns
			</h2>
			<AnimatePresence>
				{countdowns.map((countdown) => (
					<motion.div
						key={countdown.id}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.3 }}
					>
						<div
							className={`flex justify-between items-center p-3 rounded-md cursor-pointer transition-colors mb-2 ${
								countdown.id === activeCountdownId
									? "bg-blue-100 dark:bg-blue-900"
									: "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
							}`}
							onClick={() => onSelect(countdown)}
						>
							<div className="flex items-center">
								<Clock className="h-5 w-5 mr-2 text-gray-600 dark:text-gray-400" />
								<span className="text-gray-800 dark:text-gray-200">
									{countdown.name}
								</span>
							</div>
							<span className="text-sm text-gray-600 dark:text-gray-400">
								{new Date(countdown.date).toLocaleDateString()}
							</span>
						</div>
					</motion.div>
				))}
			</AnimatePresence>
			{countdowns.length === 0 && (
				<p className="text-center text-gray-600 dark:text-gray-400">
					No countdowns yet. Create one above!
				</p>
			)}
		</div>
	);
}
