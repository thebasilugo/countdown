import { formatDistanceToNowStrict, differenceInMilliseconds } from "date-fns";

export function formatTimeLeft(targetDate: Date) {
	const now = new Date();
	const difference = differenceInMilliseconds(targetDate, now);

	if (difference <= 0) {
		return { days: "00", hours: "00", minutes: "00", seconds: "00", total: 0 };
	}

	const formattedDistance = formatDistanceToNowStrict(targetDate, {
		addSuffix: false,
	});
	const [value, unit] = formattedDistance.split(" ");

	const days = unit.startsWith("day") ? value.padStart(2, "0") : "00";
	const hours = unit === "hours" ? value.padStart(2, "0") : "00";
	const minutes = unit === "minutes" ? value.padStart(2, "0") : "00";
	const seconds = unit === "seconds" ? value.padStart(2, "0") : "00";

	return { days, hours, minutes, seconds, total: difference };
}
