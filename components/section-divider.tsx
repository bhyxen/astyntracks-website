"use client";

import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function SectionDivider() {
	const dividerRef = useRef(null);
	const isInView = useInView(dividerRef, { once: false, margin: "-100px" });
	const [glitchActive, setGlitchActive] = useState(false);

	// Trigger glitch effect when in view
	useEffect(() => {
		if (isInView) {
			const glitchTimeout = setTimeout(() => {
				setGlitchActive(true);
				setTimeout(() => setGlitchActive(false), 200);
			}, 500);

			return () => clearTimeout(glitchTimeout);
		}
	}, [isInView]);

	// Random glitch effect
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
			Math.random() * 5000 + 3000,
		);

		return () => clearInterval(glitchInterval);
	}, []);

	return (
		<div ref={dividerRef} className="relative h-24 overflow-hidden">
			{/* Noise texture */}
			<div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>

			{/* Digital distortion overlay */}
			<div
				className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
				style={{
					backgroundImage:
						"url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJuIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC45IiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiMwMDAiLz48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsdGVyPSJ1cmwoI24pIiBvcGFjaXR5PSIwLjQiLz48L3N2Zz4=')",
					backgroundSize: "100px",
				}}
			></div>

			{/* Concrete texture */}
			<div
				className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
				style={{
					backgroundImage:
						"url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjA1IiBudW1PY3RhdmVzPSI1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1IiBkPSJNMCAwaDUwMHY1MDBIMHoiLz48L3N2Zz4=')",
					backgroundSize: "cover",
				}}
			></div>

			{/* More aggressive torn paper effect with glitch */}
			<motion.svg
				viewBox="0 0 1200 120"
				preserveAspectRatio="none"
				className="absolute top-0 left-0 w-full h-12 rotate-180"
				animate={
					glitchActive
						? {
								x: [0, Math.random() * 10 - 5, 0],
								scaleX: [1, 1 + Math.random() * 0.05, 1],
							}
						: {}
				}
				transition={{ duration: 0.2 }}
			>
				<motion.path
					d="M0,0 C150,120 271,0 501,100 C700,0 800,120 1200,20 L1200,120 L0,120 Z"
					className="fill-gray-900 opacity-30"
					animate={
						glitchActive
							? {
									d: [
										"M0,0 C150,120 271,0 501,100 C700,0 800,120 1200,20 L1200,120 L0,120 Z",
										"M0,0 C150,130 271,-10 501,110 C700,-10 800,130 1200,10 L1200,120 L0,120 Z",
										"M0,0 C150,120 271,0 501,100 C700,0 800,120 1200,20 L1200,120 L0,120 Z",
									],
								}
							: {}
					}
					transition={{ duration: 0.2 }}
				></motion.path>
			</motion.svg>

			<motion.svg
				viewBox="0 0 1200 120"
				preserveAspectRatio="none"
				className="absolute bottom-0 left-0 w-full h-12"
				animate={
					glitchActive
						? {
								x: [0, Math.random() * 10 - 5, 0],
								scaleX: [1, 1 + Math.random() * 0.05, 1],
							}
						: {}
				}
				transition={{ duration: 0.2 }}
			>
				<motion.path
					d="M0,0 C150,120 271,0 501,100 C700,0 800,120 1200,20 L1200,120 L0,120 Z"
					className="fill-gray-900 opacity-30"
					animate={
						glitchActive
							? {
									d: [
										"M0,0 C150,120 271,0 501,100 C700,0 800,120 1200,20 L1200,120 L0,120 Z",
										"M0,0 C150,130 271,-10 501,110 C700,-10 800,130 1200,10 L1200,120 L0,120 Z",
										"M0,0 C150,120 271,0 501,100 C700,0 800,120 1200,20 L1200,120 L0,120 Z",
									],
								}
							: {}
					}
					transition={{ duration: 0.2 }}
				></motion.path>
			</motion.svg>

			{/* Barbed wire effect with glitch */}
			<motion.div
				className="absolute top-1/2 left-0 right-0 h-[1px] bg-gray-700 transform -translate-y-1/2"
				animate={
					glitchActive
						? {
								scaleX: [1, 1.02, 0.98, 1],
								opacity: [1, 0.7, 1],
							}
						: {}
				}
				transition={{ duration: 0.2 }}
			>
				{Array.from({ length: 20 }).map((_, i) => (
					<motion.div
						key={i}
						className="absolute w-2 h-2 border-t border-r border-gray-700 transform rotate-45"
						style={{ left: `${i * 5}%`, top: "-4px" }}
						animate={
							glitchActive
								? {
										rotate: [
											"45deg",
											`${45 + Math.random() * 20 - 10}deg`,
											"45deg",
										],
										x: [0, Math.random() * 4 - 2, 0],
										y: [0, Math.random() * 4 - 2, 0],
									}
								: {}
						}
						transition={{ duration: 0.2 }}
					></motion.div>
				))}
			</motion.div>

			{/* Glitch lines with more intensity */}
			{Array.from({ length: 5 }).map((_, i) => (
				<motion.div
					key={i}
					className="absolute bg-gray-500 h-[1px] left-0 right-0"
					style={{ top: `${20 + i * 15}%` }}
					animate={
						glitchActive
							? {
									opacity: [0.2, 0.8, 0.2],
									scaleX: [1, 1.1, 0.9, 1],
									translateX: [0, Math.random() * 20 - 10, 0],
									height: [
										"1px",
										`${Math.random() * 3 + 1}px`,
										"1px",
									],
								}
							: {
									opacity: [0.2, 0.5, 0.2],
									left: ["-100%", "100%"],
								}
					}
					transition={
						glitchActive
							? { duration: 0.2 }
							: {
									duration: 2,
									delay: i * 0.5,
									repeat: Number.POSITIVE_INFINITY,
									repeatType: "loop",
									ease: "linear",
								}
					}
				></motion.div>
			))}

			{/* Data corruption effect */}
			{Array.from({ length: 3 }).map((_, i) => (
				<motion.div
					key={`data-corruption-${i}`}
					className="absolute bg-yellow-400/10"
					style={{
						height: "100%",
						width: `${Math.random() * 3 + 1}px`,
						left: `${Math.random() * 100}%`,
					}}
					animate={{
						opacity: [0, 0.7, 0],
						height: ["0%", "100%", "0%"],
						top: ["100%", "0%", "0%"],
					}}
					transition={{
						duration: Math.random() * 1.5 + 0.5,
						repeat: Number.POSITIVE_INFINITY,
						repeatType: "loop",
						ease: "linear",
						delay: i * 1.5,
					}}
				/>
			))}

			{/* RGB split effect - only shows during glitch */}
			{glitchActive && (
				<>
					<div
						className="absolute inset-0 bg-red-500/10 mix-blend-multiply z-10"
						style={{
							transform: `translateX(${Math.random() * 10 - 5}px)`,
						}}
					/>
					<div
						className="absolute inset-0 bg-blue-500/10 mix-blend-multiply z-10"
						style={{
							transform: `translateX(${Math.random() * -10 + 5}px)`,
						}}
					/>
				</>
			)}

			{/* Marker with glitch */}
			<motion.div
				className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-yellow-400/50 font-mono"
				animate={
					glitchActive
						? {
								x: [
									"-50%",
									`calc(-50% + ${Math.random() * 10 - 5}px)`,
									"-50%",
								],
								y: [0, Math.random() * 4 - 2, 0],
								opacity: [0.5, 0.8, 0.5],
							}
						: {}
				}
				transition={{ duration: 0.2 }}
			>
				{/* WARNING */}
			</motion.div>
		</div>
	);
}
