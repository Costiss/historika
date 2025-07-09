"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { LoadingSpinner } from "./spinner";

interface Props {
	options: { value: string; label: string }[];
	placeholder?: string;
	emptyMessage?: string;
	onSelected: (value?: string) => void;
	onChange?: (value: string) => void;
	isLoading?: boolean;
	className?: string;
}

export function Combobox({
	options,
	placeholder = "Select an option...",
	onSelected = (value?: string) => value,
	onChange = (value: string) => value,
	isLoading = false,
	emptyMessage = "No options found.",
	className = "",
}: Props) {
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState("");

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className={cn("justify-between w-full", className)}
				>
					{value ? options.find((o) => o.value === value)?.label : placeholder}
					<ChevronsUpDown className="opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="p-0 popover-content-width-same-as-its-trigger">
				<Command
					filter={(value, search, keywords) => {
						const extendValue = value + " " + keywords?.join(" ");
						if (extendValue.toLowerCase().includes(search.toLowerCase())) {
							return 1;
						}
						return 0;
					}}
				>
					<CommandInput
						onValueChange={onChange}
						placeholder={placeholder}
						className="h-9"
					/>
					<CommandList>
						{isLoading ? (
							<div className="flex items-center justify-center p-4">
								<LoadingSpinner />
							</div>
						) : (
							<>
								<CommandEmpty>{emptyMessage}</CommandEmpty>
								<CommandGroup>
									{options.map((option) => (
										<CommandItem
											key={option.value}
											value={option.value}
											keywords={[option.label.toLowerCase()]}
											onSelect={(currentValue) => {
												setValue(currentValue === value ? "" : currentValue);
												onSelected(
													currentValue === value ? undefined : currentValue,
												);
												setOpen(false);
											}}
										>
											{option.label}
											<Check
												className={cn(
													"ml-auto",
													value === option.value ? "opacity-100" : "opacity-0",
												)}
											/>
										</CommandItem>
									))}
								</CommandGroup>
							</>
						)}
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
