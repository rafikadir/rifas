"use client";
import { MouseEventHandler } from "react";

type ButtonProps = {
	type?: "button" | "submit";
	text: string;
	loadingText?: string;
	size?: string;
	padding?: number;
	centered?: boolean;
	bgColor?: string;
	round?: string;
	textColor?: string;
	hoverColor?: string;
	hoverTextColor?: string;
	isLoading?: boolean;
	handler?: MouseEventHandler<HTMLButtonElement>;
};

export const Button = ({
	type = "button",
	text,
	loadingText,
	size = "w-full",
	centered = true,
	bgColor = "blue-500",
	round = "md",
	padding = 2,
	textColor = "light",
	hoverColor = "blue-600",
	hoverTextColor = "",
	isLoading = false,
	handler,
}: ButtonProps) => {
	const buttonClasses = `p-${padding} rounded-${round} bg-${bgColor} text-${textColor} hover:bg-${hoverColor} hover:text-${hoverTextColor}`;
	return (
		<div className={`${centered && "text-center"}`}>
			<button
				type={type}
				onClick={handler}
				aria-disabled={isLoading}
				disabled={isLoading}
				className={`${size} ${buttonClasses} disabled:bg-opacity-60`}
			>
				{isLoading ? loadingText : text}
			</button>
		</div>
	);
};
