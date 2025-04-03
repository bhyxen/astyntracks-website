"use client";

import { Suspense, useRef, useEffect, useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Sparkles } from "@react-three/drei";
import LogoModel from "./logo-model";
import { ArrowDown } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import CustomButton from "./customButton";

export default function Hero() {
	const containerRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const [glitchActive, setGlitchActive] = useState(false);
	const [glitchIntensity, setGlitchIntensity] = useState(1);

	const [glitchText, setGlitchText] = useState<string>();

	// Update text with random characters periodically for the glitch effect
	useEffect(() => {
		const characters =
			"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{};:'\",.<>/?|\\`~";
		const interval = setInterval(() => {
			let newText = "";
			for (let i = 0; i < 15; i++) {
				newText += characters.charAt(
					Math.floor(Math.random() * characters.length),
				);
			}
			setGlitchText(newText);
		}, 100); // Adjust speed as desired
		return () => clearInterval(interval);
	}, []);

	// Track scroll progress for scaling effect
	const { scrollYProgress } = useScroll();
	const textScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.5]);
	const logoScale = useTransform(scrollYProgress, [0, 0.2], [1.5, 2.5]);

	// More aggressive glitch effect for text styling
	const applyGlitchEffect = useCallback(() => {
		if (titleRef.current) {
			const intensity = glitchIntensity * 2;
			titleRef.current.style.textShadow = `
        ${Math.random() * intensity - intensity / 2}px ${Math.random() * intensity - intensity / 2}px rgba(255, 230, 0, 0.7),
        ${Math.random() * -intensity + intensity / 2}px ${Math.random() * -intensity + intensity / 2}px rgba(255, 255, 255, 0.5),
        ${Math.random() * intensity - intensity / 2}px ${Math.random() * intensity - intensity / 2}px rgba(0, 255, 255, 0.3)
      `;
			titleRef.current.style.transform = `translate(${Math.random() * intensity - intensity / 2}px, ${Math.random() * intensity - intensity / 2}px) skew(${Math.random() * intensity - intensity / 2}deg)`;

			if (Math.random() > 0.7) {
				titleRef.current.style.clipPath = `inset(${Math.random() * 10}% 0 ${Math.random() * 5}% 0)`;
			} else {
				titleRef.current.style.clipPath = "none";
			}
		}
	}, [glitchIntensity]);

	// Reset glitch effect styling
	const resetGlitchEffect = useCallback(() => {
		if (titleRef.current) {
			titleRef.current.style.textShadow = "";
			titleRef.current.style.transform = "none";
			titleRef.current.style.clipPath = "none";
		}
	}, []);

	// Glitch effect timing for text styling
	useEffect(() => {
		let timeout: NodeJS.Timeout;
		let glitchTimeout: NodeJS.Timeout;

		const glitchEffect = () => {
			setGlitchActive(true);
			applyGlitchEffect();

			// Reset after a short time
			timeout = setTimeout(() => {
				resetGlitchEffect();
				setGlitchActive(false);
			}, 150);
		};

		// Apply glitch effect periodically
		const interval = setInterval(
			() => {
				glitchEffect();

				// Sometimes trigger multiple glitches in succession
				if (Math.random() > 0.7) {
					glitchTimeout = setTimeout(
						() => {
							glitchEffect();
							if (Math.random() > 0.5) {
								setTimeout(
									glitchEffect,
									Math.random() * 200 + 50,
								);
							}
						},
						Math.random() * 200 + 100,
					);
				}

				// Randomly change glitch intensity
				setGlitchIntensity(Math.random() * 3 + 1);
			},
			Math.random() * 2000 + 1000,
		);

		return () => {
			clearInterval(interval);
			clearTimeout(timeout);
			clearTimeout(glitchTimeout);
		};
	}, [applyGlitchEffect, resetGlitchEffect]);

	const screenWidth = window.innerWidth;
	const mobileBreakpoint = 768;
	const modelPosition =
		screenWidth < mobileBreakpoint ? [0, 0.7, 0] : [0, 0.7, 0];

	return (
		<div
			ref={containerRef}
			className="relative h-screen w-full overflow-hidden bg-black"
		>
			{/* Noise texture overlay */}
			<div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>

			{/* Digital distortion overlay */}
			<div
				className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
				style={{
					backgroundImage:
						"url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJuIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC45IiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+<br/><rect width='200' height='200' fill='#000' /><rect width='200' height='200' fill='#000' opacity='0.4'/></svg>')",
					backgroundSize: "100px",
				}}
			></div>

			{/* Concrete texture overlay */}
			<div
				className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
				style={{
					backgroundImage:
						"url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjA1IiBudW1PY3RhdmVzPSI1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1IiBkPSJNMCAwaDUwMHY1MDBIMHoiLz48L3N2Zz4=')",
					backgroundSize: "cover",
				}}
			></div>

			{/* Minimal grid lines */}
			<div
				className="absolute inset-0 opacity-5"
				style={{
					backgroundImage:
						"linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)",
					backgroundSize: "50px 50px",
				}}
			></div>

			{/* Abstract geometric shapes */}
			<div className="absolute top-[20%] left-[10%] w-32 h-32 border border-gray-700 opacity-20 rotate-12"></div>
			<div className="absolute bottom-[30%] right-[15%] w-24 h-24 border border-gray-700 opacity-20 -rotate-12"></div>
			<div className="absolute top-[40%] right-[20%] w-16 h-16 bg-gray-800 opacity-10 rotate-45"></div>

			{/* Warehouse elements */}
			<div className="absolute top-[15%] left-[25%] w-40 h-1 bg-yellow-400/20"></div>
			<div className="absolute bottom-[25%] right-[30%] w-1 h-40 bg-yellow-400/20"></div>

			{/* Glitch blocks - random rectangles that appear and disappear */}
			{Array.from({ length: 8 }).map((_, i) => (
				<motion.div
					key={`glitch-block-${i}`}
					className="absolute bg-yellow-400/30"
					style={{
						width: `${Math.random() * 100 + 20}px`,
						height: `${Math.random() * 30 + 5}px`,
						left: `${Math.random() * 100}%`,
						top: `${Math.random() * 100}%`,
						mixBlendMode: "exclusion",
					}}
					initial={{ opacity: 0 }}
					animate={
						glitchActive
							? {
									opacity: [0, 0.8, 0],
									x: [0, Math.random() * 20 - 10, 0],
								}
							: { opacity: 0 }
					}
					transition={{ duration: 0.2 }}
				/>
			))}

			{/* RGB split effect - only shows during glitch */}
			{glitchActive && (
				<>
					<div
						className="absolute inset-0 bg-red-500/10 mix-blend-multiply"
						style={{
							transform: `translateX(${Math.random() * 10 - 5}px)`,
						}}
					/>
					<div
						className="absolute inset-0 bg-blue-500/10 mix-blend-multiply"
						style={{
							transform: `translateX(${Math.random() * -10 + 5}px)`,
						}}
					/>
				</>
			)}

			{/* Torn paper effect */}
			<div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
				<svg
					viewBox="0 0 1200 120"
					preserveAspectRatio="none"
					className="absolute bottom-0 left-0 w-full h-16"
				>
					<path
						d="M0,0 C150,120 271,0 501,100 C700,0 800,120 1200,20 L1200,120 L0,120 Z"
						className="fill-gray-900 opacity-30"
					></path>
				</svg>
			</div>

			{/* 3D Logo Canvas */}
			<Canvas className="absolute inset-0">
				<Suspense fallback={null}>
					<LogoModel position={modelPosition} scale={logoScale} />
					<Sparkles
						count={50}
						scale={10}
						size={1.5}
						speed={0.3}
						color="#FFE600"
					/>
					<OrbitControls
						enableZoom={false}
						autoRotate
						autoRotateSpeed={0.5}
						maxPolarAngle={Math.PI / 2}
						minPolarAngle={Math.PI / 4}
					/>
					<Environment preset="night" />
					<ambientLight intensity={0.3} />
					<spotLight
						position={[10, 10, 10]}
						angle={0.15}
						penumbra={1}
						intensity={1}
						color="#FFE600"
					/>
				</Suspense>
			</Canvas>

			{/* Overlay content */}
			<div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
				<motion.div
					className="text-center mt-56"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					style={{ scale: textScale }}
				>
					<div className="mt-4 flex justify-center">
						<motion.div
							className="h-1 w-32 bg-yellow-400"
							initial={{ width: 0 }}
							animate={{ width: 128 }}
							transition={{ duration: 0.8, delay: 0.5 }}
						/>
					</div>
					<motion.p
						ref={titleRef}
						className="text-xl md:text-2xl mt-6 text-white tracking-widest uppercase"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.7 }}
					>
						Stellar Tracks
					</motion.p>

					<motion.div
						className="mt-2 text-xs text-yellow-400/50 font-mono"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.9 }}
					>
						{glitchText}
					</motion.div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.9 }}
					className="mt-12"
				>
					<CustomButton
						onClick={() => {
							document
								.getElementById("about")
								?.scrollIntoView({ behavior: "smooth" });
						}}
					>
						ENTER
						<ArrowDown className="ml-2 h-4 w-4 group-hover:animate-bounce" />
					</CustomButton>
				</motion.div>
			</div>

			{/* Static/glitch lines */}
			<div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
				{Array.from({ length: 15 }).map((_, i) => (
					<motion.div
						key={i}
						className="absolute bg-gray-400 h-[1px]"
						style={{
							top: `${Math.random() * 100}%`,
							left: 0,
							right: 0,
							opacity: Math.random() * 0.5 + 0.25,
							height: `${Math.random() * 2}px`,
						}}
						animate={
							glitchActive
								? {
										opacity: [0.2, 0.8, 0.2],
										scaleX: [1, 1.05, 1],
										translateX: [
											0,
											Math.random() * 10 - 5,
											0,
										],
									}
								: {}
						}
						transition={{ duration: 0.2 }}
					></motion.div>
				))}
			</div>

			{/* Horizontal line */}
			<div className="absolute bottom-0 left-0 right-0 h-[1px] bg-yellow-400/30"></div>

			{/* VHS tracking lines */}
			<div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-overlay opacity-5">
				<motion.div
					className="absolute inset-0"
					style={{
						backgroundImage:
							"repeating-linear-gradient(0deg, rgba(255,255,255,0.1), rgba(255,255,255,0.1) 1px, transparent 1px, transparent 4px)",
						backgroundSize: "100% 4px",
					}}
					animate={{
						y: [0, 10, 0, -5, 0],
					}}
					transition={{
						duration: 8,
						repeat: Number.POSITIVE_INFINITY,
						repeatType: "loop",
						ease: "easeInOut",
					}}
				/>
			</div>

			{/* Data corruption effect */}
			<div className="absolute inset-0 pointer-events-none">
				{Array.from({ length: 3 }).map((_, i) => (
					<motion.div
						key={`data-corruption-${i}`}
						className="absolute bg-yellow-400/5"
						style={{
							height: "100%",
							width: `${Math.random() * 5 + 1}px`,
							left: `${Math.random() * 100}%`,
						}}
						animate={{
							opacity: [0, 0.5, 0],
							height: ["0%", "100%", "0%"],
							top: ["100%", "0%", "0%"],
						}}
						transition={{
							duration: Math.random() * 2 + 1,
							repeat: Number.POSITIVE_INFINITY,
							repeatType: "loop",
							ease: "linear",
							delay: i * 2,
						}}
					/>
				))}
			</div>

			{/* Timestamp with glitch effect */}
			<motion.div
				className="absolute bottom-4 right-4 text-xs text-gray-500 font-mono"
				animate={
					glitchActive
						? {
								x: [0, Math.random() * 4 - 2, 0],
								y: [0, Math.random() * 4 - 2, 0],
							}
						: {}
				}
			>
				{new Date().toLocaleTimeString([], {
					hour: "2-digit",
					minute: "2-digit",
				})}
			</motion.div>
		</div>
	);
}
