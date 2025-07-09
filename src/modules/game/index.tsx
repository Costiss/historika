"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";
import CountryInput, { type Country } from "./country-input";
import Timeline from "./timeline";
import Attempts from "./attempts";
import GameOver from "./game-over";

interface TimelineEvent {
	year: number;
	description: string;
}

interface GameData {
	country: string;
	events: TimelineEvent[];
	hints: string[];
}

// Sample game data - in a real app, this would come from an API
const sampleGame: GameData = {
	country: "Japan",
	events: [
		{
			year: 1868,
			description: "Meiji Restoration begins, ending feudal system",
		},
		{
			year: 1941,
			description: "Attack on Pearl Harbor launches Pacific War involvement",
		},
		{
			year: 1945,
			description: "Atomic bombs dropped, leading to surrender in WWII",
		},
		{ year: 1964, description: "First Asian country to host Summer Olympics" },
		{
			year: 1995,
			description: "Great Hanshin earthquake devastates Kobe region",
		},
		{
			year: 2011,
			description: "Massive earthquake and tsunami trigger nuclear disaster",
		},
	],
	hints: [
		"Island nation in East Asia",
		"Known for cherry blossoms and Mount Fuji",
		"Home to Nintendo and Toyota",
	],
};

export default function Component() {
	const [guess, setGuess] = useState<Country | null>(null);
	const [attempts, setAttempts] = useState<string[]>([]);
	const [gameWon, setGameWon] = useState(false);
	const [gameOver, setGameOver] = useState(false);
	const [showHints, setShowHints] = useState(false);
	const [currentHintIndex, setCurrentHintIndex] = useState(0);

	const maxAttempts = 6;

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!guess || gameOver) return;

		const normalizedGuess = guess?.country_name.trim().toLowerCase();
		const normalizedAnswer = sampleGame.country.toLowerCase();

		const newAttempts = [...attempts, guess?.country_name.trim()];
		setAttempts(newAttempts);

		if (normalizedGuess === normalizedAnswer) {
			setGameWon(true);
			setGameOver(true);
		} else if (newAttempts.length >= maxAttempts) {
			setGameOver(true);
		}

		setGuess(null);
	};

	const resetGame = () => {
		setGuess(null);
		setAttempts([]);
		setGameWon(false);
		setGameOver(false);
		setShowHints(false);
		setCurrentHintIndex(0);
	};

	// const showNextHint = () => {
	// 	if (currentHintIndex < sampleGame.hints.length - 1) {
	// 		setCurrentHintIndex(currentHintIndex + 1);
	// 	}
	// 	setShowHints(true);
	// };

	const shareResults = () => {
		const emoji = gameWon ? "🎉" : "😔";
		const result = `Timeline Game ${emoji}\nGuessed in ${attempts.length}/${maxAttempts} attempts`;
		navigator.clipboard.writeText(result);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
			<div className="max-w-2xl mx-auto">
				{/* Header */}
				<div className="text-center mb-4">
					<h1 className="text-4xl font-bold text-gray-900 mb-2">Historika</h1>
					<p className="text-gray-600">
						Guess the country from historical events
					</p>
					<div className="flex items-center justify-center gap-4 mt-4">
						<Badge variant="outline" className="flex items-center gap-1">
							<Calendar className="w-4 h-4" />
							Daily Challenge
						</Badge>
					</div>
				</div>

				<CountryInput
					gameOver={gameOver}
					guess={guess}
					setGuess={setGuess}
					handleSubmit={handleSubmit}
					maxAttempts={maxAttempts}
					attempts={attempts}
				/>

				{/* <Attempts attempts={attempts} gameOver={gameOver} /> */}
				<GameOver
					gameOver={gameOver}
					gameWon={gameWon}
					sampleGame={sampleGame}
					attempts={attempts}
					shareResults={shareResults}
					resetGame={resetGame}
				/>

				<Timeline
					events={sampleGame.events.map((a) => ({
						year: a.year,
						event: a.description,
					}))}
				/>

				{/* Hints */}
				{/* {showHints && ( */}
				{/* 	<Card className="mb-6 border-yellow-200 bg-yellow-50"> */}
				{/* 		<CardHeader> */}
				{/* 			<CardTitle className="text-yellow-800">Hints</CardTitle> */}
				{/* 		</CardHeader> */}
				{/* 		<CardContent> */}
				{/* 			<div className="space-y-2"> */}
				{/* 				{sampleGame.hints */}
				{/* 					.slice(0, currentHintIndex + 1) */}
				{/* 					.map((hint, index) => ( */}
				{/* 						<p key={index} className="text-yellow-700"> */}
				{/* 							💡 {hint} */}
				{/* 						</p> */}
				{/* 					))} */}
				{/* 			</div> */}
				{/* 		</CardContent> */}
				{/* 	</Card> */}
				{/* )} */}

				{/* Game Stats */}
				{/* <Card> */}
				{/* 	<CardHeader> */}
				{/* 		<CardTitle>Game Statistics</CardTitle> */}
				{/* 	</CardHeader> */}
				{/* 	<CardContent> */}
				{/* 		<div className="grid grid-cols-3 gap-4 text-center"> */}
				{/* 			<div> */}
				{/* 				<div className="text-2xl font-bold text-indigo-600"> */}
				{/* 					{attempts.length} */}
				{/* 				</div> */}
				{/* 				<div className="text-sm text-gray-600">Attempts Used</div> */}
				{/* 			</div> */}
				{/* 			<div> */}
				{/* 				<div className="text-2xl font-bold text-indigo-600"> */}
				{/* 					{attemptsLeft} */}
				{/* 				</div> */}
				{/* 				<div className="text-sm text-gray-600">Attempts Left</div> */}
				{/* 			</div> */}
				{/* 			<div> */}
				{/* 				<div className="text-2xl font-bold text-indigo-600"> */}
				{/* 					{showHints ? currentHintIndex + 1 : 0} */}
				{/* 				</div> */}
				{/* 				<div className="text-sm text-gray-600">Hints Used</div> */}
				{/* 			</div> */}
				{/* 		</div> */}
				{/* 	</CardContent> */}
				{/* </Card> */}
			</div>
		</div>
	);
}
