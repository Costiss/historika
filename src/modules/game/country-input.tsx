import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Combobox } from "@/components/ui/combobox";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

export interface Country {
	country_name: string;
	country_code: string;
}

interface Props {
	gameOver: boolean;
	guess: Country | null;
	setGuess: (value: Country) => void;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	maxAttempts: number;
	attempts?: string[];
}

export default function CountryInput({
	gameOver,
	guess,
	setGuess,
	handleSubmit,
	maxAttempts,
	attempts = ["Teste"],
}: Props) {
	const [searchTerm, setSearchTerm] = React.useState("");
	const [spinnerVisible, setSpinnerVisible] = React.useState(false);
	const debouncedSearch = useDebounce(searchTerm, 200);
	const [value, setValue] = React.useState<string | undefined>(undefined);

	const q = useQuery({
		queryKey: ["country-input", debouncedSearch],
		queryFn: async () => {
			const response = await fetch(`/api/countries?search=${searchTerm}`);
			setSpinnerVisible(false);
			return response.json() as Promise<Country[]>;
		},

		enabled: !gameOver,
	});

	if (gameOver) {
		return <></>;
	}

	function findCountryByCode(code?: string): Country {
		return (
			q.data?.find((c) => c.country_code === code) || {
				country_name: "",
				country_code: "",
			}
		);
	}

	return (
		<Card className="mb-6">
			<CardContent className="pt-2">
				<form
					onSubmit={(e) => {
						setSpinnerVisible(false);
						setSearchTerm("");
						setValue(undefined);
						handleSubmit(e);
					}}
					className="space-y-4"
				>
					<div className="flex items-center justify-center">
						<Badge variant="outline" className="flex items-center gap-1">
							<MapPin size={48} />
							{maxAttempts - attempts.length} attempts left
						</Badge>
					</div>
					{attempts.map((attempt, index) => (
						<div
							key={index}
							className="flex items-center justify-between p-3 bg-gray-50 rounded-lg gap-0"
						>
							<span className="font-medium">{attempt}</span>
							<Badge variant="destructive">Incorrect</Badge>
						</div>
					))}
					<div>
						<label
							htmlFor="country-guess"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Which country do these events belong to?
						</label>
						<Combobox
							className="text-lg"
							value={value}
							setValue={setValue}
							isLoading={q.isLoading || spinnerVisible}
							placeholder="Select a country..."
							onChange={(setValue) => {
								setSpinnerVisible(true);
								setSearchTerm(setValue);
							}}
							options={
								q.data?.map((c) => ({
									value: c.country_code,
									label: c.country_name,
								})) || []
							}
							onSelected={(value) => {
								const selectedCountry = findCountryByCode(value);
								setGuess(selectedCountry);
							}}
						/>

						{/* <Input */}
						{/* 	id="country-guess" */}
						{/* 	type="text" */}
						{/* 	value={guess} */}
						{/* 	onChange={(e) => setGuess(e.target.value)} */}
						{/* 	placeholder="Enter country name..." */}
						{/* 	className="text-lg" */}
						{/* 	disabled={gameOver} */}
						{/* /> */}
					</div>
					<div className="flex gap-2">
						<Button
							type="submit"
							className="flex-1"
							disabled={!guess || gameOver}
						>
							Submit Guess
						</Button>
						{/* {!showHints && */}
						{/* 	currentHintIndex < sampleGame.hints.length - 1 && ( */}
						{/* 		<Button */}
						{/* 			type="button" */}
						{/* 			variant="outline" */}
						{/* 			onClick={showNextHint} */}
						{/* 		> */}
						{/* 			Get Hint */}
						{/* 		</Button> */}
						{/* 	)} */}
						{/* {showHints && */}
						{/* 	currentHintIndex < sampleGame.hints.length - 1 && ( */}
						{/* 		<Button */}
						{/* 			type="button" */}
						{/* 			variant="outline" */}
						{/* 			onClick={showNextHint} */}
						{/* 		> */}
						{/* 			Next Hint */}
						{/* 		</Button> */}
						{/* 	)} */}
					</div>
				</form>
			</CardContent>
		</Card>
	);
}
