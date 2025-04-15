"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	// Handle scroll effect
	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 50) {
				setScrolled(true);
			} else {
				setScrolled(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Handle navigation and close menu
	const handleNavigation = (id: string) => {
		setIsOpen(false);
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		} else if (id === "home") {
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	};

	const [glitchActive, setGlitchActive] = useState(false);

	// Randomly trigger glitch effect
	useEffect(() => {
		const glitchInterval = setInterval(
			() => {
				if (Math.random() > 0.8) {
					setGlitchActive(true);
					setTimeout(
						() => setGlitchActive(false),
						Math.random() * 200 + 100,
					);
				}
			},
			Math.random() * 8000 + 5000,
		);

		// Randomly show/hide warning

		return () => {
			clearInterval(glitchInterval);
		};
	}, []);

	return (
		<>
			<header
				className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
					scrolled
						? "bg-black/90 backdrop-blur-md border-b border-yellow-400/20"
						: "bg-transparent"
				}`}
			>
				<div className="container mx-auto px-4">
					<div className="flex items-center justify-between h-16">
						{/* Logo */}
						<motion.button
							className="text-2xl font-bold text-white uppercase tracking-widest relative"
							onClick={() => handleNavigation("home")}
							animate={
								glitchActive
									? {
											x: [0, Math.random() * 4 - 2, 0],
											y: [0, Math.random() * 4 - 2, 0],
										}
									: {}
							}
							transition={{ duration: 0.1 }}
						>
							ASTYN
							{glitchActive && (
								<motion.span
									className="absolute inset-0 text-yellow-400 opacity-70"
									style={{
										clipPath: `inset(${Math.random() * 50}% 0 ${
											Math.random() * 50
										}% 0)`,
										transform: `translate(${Math.random() * 4 - 2}px, ${
											Math.random() * 4 - 2
										}px)`,
									}}
								>
									ASTYN
								</motion.span>
							)}
						</motion.button>

						{/* Desktop Navigation */}
						<nav className="hidden md:flex items-center space-x-8">
							<NavLink onClick={() => handleNavigation("about")}>
								ABOUT
							</NavLink>
							<NavLink onClick={() => handleNavigation("music")}>
								MUSIC
							</NavLink>
							<NavLink
								onClick={() => handleNavigation("contact")}
							>
								CONTACT
							</NavLink>
							<NavLink onClick={() => handleNavigation("follow")}>
								FOLLOW
							</NavLink>
						</nav>

						{/* Mobile Menu Button */}
						<Button
							variant="ghost"
							size="icon"
							className="md:hidden text-white hover:bg-yellow-400/10"
							onClick={() => setIsOpen(!isOpen)}
						>
							{isOpen ? (
								<X className="h-6 w-6" />
							) : (
								<Menu className="h-6 w-6" />
							)}
						</Button>
					</div>
				</div>
				{/* Glitch overlay */}
				{glitchActive && (
					<>
						<div
							className="absolute inset-0 bg-red-500/5 mix-blend-multiply z-0"
							style={{
								transform: `translateX(${Math.random() * 5 - 2.5}px)`,
							}}
						/>
						<div
							className="absolute inset-0 bg-blue-500/5 mix-blend-multiply z-0"
							style={{
								transform: `translateX(${Math.random() * -5 + 2.5}px)`,
							}}
						/>
						{Array.from({ length: 3 }).map((_, i) => (
							<motion.div
								key={`nav-glitch-${i}`}
								className="absolute h-[1px] bg-yellow-400/30 z-0"
								style={{
									top: `${Math.random() * 100}%`,
									left: 0,
									right: 0,
								}}
								animate={{
									opacity: [0, 0.8, 0],
									scaleX: [0, 1, 0],
								}}
								transition={{ duration: 0.2 }}
							/>
						))}
					</>
				)}
			</header>

			{/* Mobile Menu */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						className="fixed inset-0 z-40 bg-black/95 backdrop-blur-md md:hidden pt-20"
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.2 }}
					>
						<nav className="flex flex-col items-center justify-center space-y-8 p-8">
							<MobileNavLink
								onClick={() => handleNavigation("about")}
							>
								ABOUT
							</MobileNavLink>
							<MobileNavLink
								onClick={() => handleNavigation("music")}
							>
								MUSIC
							</MobileNavLink>
							<MobileNavLink
								onClick={() => handleNavigation("contact")}
							>
								CONTACT
							</MobileNavLink>
							<MobileNavLink
								onClick={() => handleNavigation("follow")}
							>
								FOLLOW
							</MobileNavLink>
						</nav>

						{/* Bottom border */}
						<div className="absolute bottom-0 left-0 right-0 h-[1px] bg-yellow-400/30"></div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}

// Desktop Nav Link
function NavLink({
	children,
	onClick,
}: {
	children: React.ReactNode;
	onClick: () => void;
}) {
	return (
		<button
			onClick={onClick}
			className="text-gray-300 hover:text-yellow-400 transition-colors relative group tracking-wider"
		>
			{children}
			<span className="absolute bottom-0 left-0 w-0 h-[1px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
		</button>
	);
}

// Mobile Nav Link
function MobileNavLink({
	children,
	onClick,
}: {
	children: React.ReactNode;
	onClick: () => void;
}) {
	return (
		<motion.button
			onClick={onClick}
			className="text-2xl font-bold text-white hover:text-yellow-400 transition-colors relative group tracking-wider"
			whileHover={{ x: 5 }}
			transition={{ type: "spring", stiffness: 400, damping: 10 }}
		>
			<span className="relative">
				{children}
				<span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
			</span>
		</motion.button>
	);
}
