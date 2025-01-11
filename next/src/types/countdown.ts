export interface Countdown {
	id: string;
	name: string;
	date: string;
	createdAt: string;
}

export interface PomodoroTimer {
	duration: number;
	remainingTime: number;
	isActive: boolean;
}
