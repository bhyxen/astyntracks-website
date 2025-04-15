"use client";

import { Suspense, useRef, useEffect, useState, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Sparkles } from "@react-three/drei";
import LogoModel from "./logo-model";
import { ArrowDown } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import CustomButton from "./customButton";
import * as THREE from "three";

const DataCorruptionEffect = () => {
	const randomValues = useMemo(
		() =>
			Array.from({ length: 3 }).map(() => ({
				width: Math.random() * 5 + 1,
				left: Math.random() * 100,
				duration: Math.random() * 2 + 1,
			})),
		[],
	);

	return (
		<>
			{randomValues.map((value, i) => (
				<motion.div
					key={`data-corruption-${i}`}
					className="absolute bg-yellow-400/5"
					style={{
						height: "100%",
						width: `${value.width}px`,
						left: `${value.left}%`,
					}}
					animate={{
						opacity: [0, 0.5, 0],
						height: ["0%", "100%", "0%"],
						top: ["100%", "0%", "0%"],
					}}
					transition={{
						duration: value.duration,
						repeat: Number.POSITIVE_INFINITY,
						repeatType: "loop",
						ease: "linear",
						delay: i * 2,
					}}
				/>
			))}
		</>
	);
};

export default function Hero() {
	const containerRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const [glitchActive, setGlitchActive] = useState(false);
	const [glitchText, setGlitchText] = useState<string>();

	// Precompute random characters for glitch text
	const characters = useMemo(
		() =>
			"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{};:'\",.<>/?|\\`~",
		[],
	);

	useEffect(() => {
		const interval = setInterval(() => {
			setGlitchText(
				Array.from({ length: 15 })
					.map(() =>
						characters.charAt(
							Math.floor(Math.random() * characters.length),
						),
					)
					.join(""),
			);
		}, 100);
		return () => clearInterval(interval);
	}, [characters]);

	// Glitch effect logic
	useEffect(() => {
		let timeout: NodeJS.Timeout;
		let glitchTimeout: NodeJS.Timeout;

		const glitchEffect = () => {
			setGlitchActive(true);

			timeout = setTimeout(() => {
				setGlitchActive(false);
			}, 150);
		};

		const interval = setInterval(
			() => {
				glitchEffect();

				if (Math.random() > 0.7) {
					glitchTimeout = setTimeout(
						glitchEffect,
						Math.random() * 200 + 100,
					);
				}
			},
			Math.random() * 2000 + 1000,
		);

		return () => {
			clearInterval(interval);
			clearTimeout(timeout);
			clearTimeout(glitchTimeout);
		};
	}, []);

	// Scroll-based transformations
	const { scrollYProgress } = useScroll();
	const textScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.5]);
	const logoScale = useTransform(scrollYProgress, [0, 0.2], [1.5, 2.5]);

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
			<div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,...')]"></div>

			{/* Glitch blocks */}
			{/* <GlitchBlock glitchActive={glitchActive} /> */}

			{/* Data corruption effect */}
			<DataCorruptionEffect />

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

			{/* 3D Logo Canvas */}
			<Canvas className="absolute inset-0">
				<Suspense fallback={null}>
					<LogoModel position={modelPosition} scale={logoScale} />
					<OrbitControls
						enableZoom={false}
						autoRotate
						autoRotateSpeed={0.5}
						maxPolarAngle={Math.PI / 2}
						minPolarAngle={Math.PI / 4}
						mouseButtons={{
							RIGHT: undefined,
							LEFT: THREE.MOUSE.ROTATE,
						}}
					/>
					<Sparkles
						count={50}
						scale={10}
						size={1.5}
						speed={0.3}
						color="#FFE600"
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
			<div className="absolute inset-0 flex flex-col items-center justify-center z-10 md:pointer-events-none">
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
		</div>
	);
}
