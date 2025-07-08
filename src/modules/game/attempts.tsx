import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Props {
    attempts: string[];
}

export default function Attempts({ attempts }: Props) {
    return (
        attempts.length > 0 && (
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Your Guesses</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {attempts.map((attempt, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                            >
                                <span className="font-medium">{attempt}</span>
                                <Badge variant="destructive">Incorrect</Badge>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        )
    );
}
