import React from "react";
import { Button } from "./ui/button";

export default function CustomButton({
	children,
	onClick,
	type = "button",
	disabled = false,
	className = "",
	variant = "default",
	asChild = false,
}: {
	children: React.ReactNode;
	onClick?: () => void;
	type?: "button" | "submit" | "reset";
	disabled?: boolean;
	className?: string;
	variant?: "default" | "outline" | "ghost";
	asChild?: boolean;
}) {
	return (
		<Button
			type={type}
			disabled={disabled}
			variant={variant}
			asChild={asChild}
			size="lg"
			className={`p-[1px] h-auto cursor-pointer relative pointer-events-auto overflow-hidden group  ${className} `}
			onClick={onClick}
		>
			<div className="w-full">
				{variant === "default" && (
					<span className="absolute inset-0 rounded-md bg-[repeating-linear-gradient(45deg,_#fcc800_0px,_#fcc800_20px,_black_20px,_black_30px)]"></span>
				)}
				<span
					className={`w-full justify-center z-10 flex inset-shadow-xs! inset-shadow-black inset-1  hover:bg-yellow-400 ${
						variant !== "outline" &&
						"bg-white/10 hover:bg-white/15 backdrop-blur-md text-black "
					} ${
						variant === "outline" &&
						"border border-yellow-400! hover:text-black"
					} ${
						variant === "ghost" &&
						"border-none! bg-transparent! text-yellow-400 p-0! hover:bg-transparent!"
					} items-center tracking-wider rounded-md px-4 py-2`}
				>
					{children}
				</span>
			</div>
		</Button>
	);
}
