import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";

interface TimelineEvent {
	year: number;
	event: string;
}

interface Props {
	events: TimelineEvent[];
}

export default function Timeline({ events }: Props) {
	return (
		<Card className="mb-6">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Calendar className="w-5 h-5" />
					Historical Timeline
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{events.map((event, index) => (
						<div key={index} className="flex items-start gap-4">
							<div className="flex-shrink-0">
								<div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
									<span className="text-sm font-bold text-indigo-700">
										{event.year}
									</span>
								</div>
							</div>
							<div className="flex-1 pt-3">
								<p className="text-gray-700">{event.event}</p>
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
