import { Countdown } from "../types/countdown";

export function useCountdownActions(
	setCountdowns: React.Dispatch<React.SetStateAction<Countdown[]>>,
	setActiveCountdown: React.Dispatch<React.SetStateAction<Countdown | null>>
) {
	const addCountdown = (newCountdown: Countdown) => {
		setCountdowns((prev) => {
			const updatedCountdowns = [...prev, newCountdown];
			setActiveCountdown(newCountdown);
			return updatedCountdowns;
		});
	};

	const updateCountdown = (updatedCountdown: Countdown) => {
		setCountdowns((prev) => {
			const updatedCountdowns = prev.map((c) =>
				c.id === updatedCountdown.id ? updatedCountdown : c
			);
			setActiveCountdown(updatedCountdown);
			return updatedCountdowns;
		});
	};

	const deleteCountdown = (id: string) => {
		setCountdowns((prev) => {
			const updatedCountdowns = prev.filter((countdown) => countdown.id !== id);
			setActiveCountdown(updatedCountdowns[0] || null);
			return updatedCountdowns;
		});
	};

	return { addCountdown, updateCountdown, deleteCountdown };
}
