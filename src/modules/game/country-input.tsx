import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface Props {
    gameOver: boolean;
    guess: string;
    setGuess: (value: string) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function CountryInput({
    gameOver,
    guess,
    setGuess,
    handleSubmit,
}: Props) {
    return (
        !gameOver && (
            <Card className="mb-6">
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label
                                htmlFor="country-guess"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Which country do these events belong to?
                            </label>
                            <Input
                                id="country-guess"
                                type="text"
                                value={guess}
                                onChange={(e) => setGuess(e.target.value)}
                                placeholder="Enter country name..."
                                className="text-lg"
                                disabled={gameOver}
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button
                                type="submit"
                                className="flex-1"
                                disabled={!guess.trim() || gameOver}
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
        )
    );
}
