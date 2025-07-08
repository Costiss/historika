import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Share2, RotateCcw } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface Props {
    gameOver: boolean;
    gameWon: boolean;
    sampleGame: { country: string };
    attempts: string[];
    shareResults: () => void;
    resetGame: () => void;
}

export default function GameOver({
    gameOver,
    gameWon,
    sampleGame,
    attempts,
    shareResults,
    resetGame,
}: Props) {
    return (
        gameOver && (
            <Card
                className={`mb-6 ${gameWon ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}
            >
                <CardContent className="pt-6 text-center">
                    {gameWon ? (
                        <div className="space-y-4">
                            <Trophy className="w-16 h-16 text-green-600 mx-auto" />
                            <h2 className="text-2xl font-bold text-green-800">
                                Congratulations!
                            </h2>
                            <p className="text-green-700">
                                You correctly guessed <strong>{sampleGame.country}</strong> in{" "}
                                {attempts.length} attempt
                                {attempts.length !== 1 ? "s" : ""}!
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                                <span className="text-2xl">😔</span>
                            </div>
                            <h2 className="text-2xl font-bold text-red-800">Game Over</h2>
                            <p className="text-red-700">
                                The correct answer was <strong>{sampleGame.country}</strong>
                            </p>
                        </div>
                    )}

                    <Separator className="my-4" />

                    <div className="flex gap-2 justify-center">
                        <Button
                            onClick={shareResults}
                            variant="outline"
                            className="flex items-center gap-2 bg-transparent"
                        >
                            <Share2 className="w-4 h-4" />
                            Share Results
                        </Button>
                        <Button onClick={resetGame} className="flex items-center gap-2">
                            <RotateCcw className="w-4 h-4" />
                            Play Again
                        </Button>
                    </div>
                </CardContent>
            </Card>
        )
    );
}
