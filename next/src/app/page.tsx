import CountdownApp from "../components/CountdownApp";

export default function Home() {
	return (
		<main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center p-4">
			<h1 className="text-4xl font-bold text-white mb-8">
				Countdown Master Pro
			</h1>
			<CountdownApp />
		</main>
	);
}
