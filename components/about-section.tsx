"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Headphones, ExternalLink } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { AdvancedImage } from "@cloudinary/react";
import { cloudinary } from "@/lib/cloudinary";
import { grayscale } from "@cloudinary/url-gen/actions/effect";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";

export default function AboutSection() {
	const sectionRef = useRef<HTMLElement>(null);
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"],
	});

	const imageOpacity = useTransform(scrollYProgress, [0, 0.5], [0.5, 1]);
	const [glitchActive, setGlitchActive] = useState(false);
	// Attach the ref to a container <div> that wraps the AdvancedImage.
	const imageContainerRef = useRef<HTMLDivElement>(null);

	// Define the image
	const image = cloudinary
		.image("astyn-6_rfyyzh")
		.format("auto") // Optimize delivery by resizing and applying auto-format and auto-quality
		.quality("auto")
		.resize(fill().gravity(autoGravity()).width(544).height(725)); // Transform the image: auto-crop to 3:4 aspect ratio
	image.effect(grayscale()); // Apply grayscale effect (optional)

	// Randomly trigger glitch effect
	useEffect(() => {
		const glitchInterval = setInterval(
			() => {
				if (Math.random() > 0.7) {
					setGlitchActive(true);

					// Grab the underlying <img> element from the container
					const imgElement =
						imageContainerRef.current?.querySelector("img");
					if (imgElement) {
						const intensity = Math.random() * 10 + 5;
						imgElement.style.filter = `
            grayscale(1) 
            contrast(1.2) 
            brightness(1.1)
            blur(${Math.random() * 2}px)
          `;
						imgElement.style.transform = `
            scale(${1 + Math.random() * 0.05}) 
            translate(${Math.random() * intensity - intensity / 2}px, ${
				Math.random() * intensity - intensity / 2
			}px)
          `;
					}

					setTimeout(
						() => {
							setGlitchActive(false);

							// Reset image styles
							const imgElement =
								imageContainerRef.current?.querySelector("img");
							if (imgElement) {
								imgElement.style.filter = "grayscale(1)";
								imgElement.style.transform = "none";
							}
						},
						Math.random() * 200 + 100,
					);
				}
			},
			Math.random() * 5000 + 3000,
		);

		return () => clearInterval(glitchInterval);
	}, []);

	return (
		<section
			ref={sectionRef}
			className="py-20 relative bg-black overflow-hidden"
		>
			{/* Digital distortion overlay */}
			<div
				className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
				style={{
					backgroundImage:
						"url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJuIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC45IiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiMwMDAiLz48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsdGVyPSJ1cmwoI24pIiBvcGFjaXR5PSIwLjQiLz48L3N2Zz4=')",
					backgroundSize: "100px",
				}}
			></div>

			{/* Glitch blocks - random rectangles that appear and disappear */}
			{glitchActive &&
				Array.from({ length: 5 }).map((_, i) => (
					<motion.div
						key={`glitch-block-${i}`}
						className="absolute bg-yellow-400/30 z-10"
						style={{
							width: `${Math.random() * 100 + 20}px`,
							height: `${Math.random() * 30 + 5}px`,
							left: `${Math.random() * 100}%`,
							top: `${Math.random() * 100}%`,
							mixBlendMode: "exclusion",
						}}
						initial={{ opacity: 0 }}
						animate={{
							opacity: [0, 0.8, 0],
							x: [0, Math.random() * 20 - 10, 0],
						}}
						transition={{ duration: 0.2 }}
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
			{/* Noise texture overlay */}
			<div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>

			{/* Concrete texture */}
			<div
				className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
				style={{
					backgroundImage:
						"url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjA1IiBudW1PY3RhdmVzPSI1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1IiBkPSJNMCAwaDUwMHY1MDBIMHoiLz48L3N2Zz4=')",
					backgroundSize: "cover",
				}}
			></div>

			{/* Abstract geometric shapes */}
			<div className="absolute top-[10%] right-[5%] w-24 h-24 border border-gray-700 opacity-10 rotate-45"></div>
			<div className="absolute bottom-[20%] left-[10%] w-16 h-16 bg-gray-800 opacity-5"></div>

			{/* Warning tape */}
			<div className="absolute top-0 left-0 right-0 h-6 bg-yellow-400/20 flex items-center justify-center overflow-hidden">
				<div className="absolute inset-0 flex items-center">
					<div className="w-full h-full flex">
						{Array.from({ length: 20 }).map((_, i) => (
							<div
								key={i}
								className="w-8 h-full bg-black/50 skew-x-12 -ml-2"
							></div>
						))}
					</div>
				</div>
				<div className="text-black text-xs font-bold tracking-wider z-10 mix-blend-darken">
					WARNING · WARNING · WARNING
				</div>
			</div>

			<motion.div
				className="text-center mb-16"
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.5 }}
			>
				<h2 className="text-5xl font-bold mb-4 text-white uppercase tracking-widest relative inline-block">
					ABOUT
					<span className="absolute -top-1 -right-4 w-3 h-3 bg-yellow-400 opacity-70"></span>
				</h2>
				<div className="h-1 w-20 bg-yellow-400 mx-auto"></div>
			</motion.div>

			<div className="max-w-4xl mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						className="relative aspect-[3/4]"
						style={{ opacity: imageOpacity }}
					>
						<div
							className="relative aspect-[3/4]"
							ref={imageContainerRef}
						>
							<AdvancedImage
								cldImg={image}
								className="border-none w-full filter grayscale hover:grayscale-0 transition-all duration-500 border border-yellow-400"
								alt="ASTYN"
							/>
							{/* Glitch effect overlay */}
							<div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40 mix-blend-color-dodge"></div>

							{/* Scan lines */}
							<div
								className="absolute inset-0 pointer-events-none opacity-10"
								style={{
									backgroundImage:
										"repeating-linear-gradient(0deg, rgba(255,255,255,0.1), rgba(255,255,255,0.1) 1px, transparent 1px, transparent 2px)",
									backgroundSize: "100% 2px",
								}}
							></div>

							{/* Warehouse location marker */}
							<div className="absolute bottom-4 left-4 text-xs text-yellow-400/70 font-mono flex items-center">
								<MapPin className="h-3 w-3 mr-1" /> ELECTRIC
								BOMBAY
							</div>

							{/* BPM indicator */}
							<div className="absolute top-4 right-4 text-xs text-yellow-400/70 font-mono flex items-center">
								<Headphones className="h-3 w-3 mr-1" /> 150 BPM
							</div>
						</div>

						{/* Torn corner effect */}
						<div className="absolute -bottom-2 -right-2 w-12 h-12 bg-black transform rotate-45 translate-x-3 translate-y-3"></div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="space-y-8"
					>
						<div className="space-y-4">
							<h3 className="text-2xl font-bold text-yellow-400 uppercase tracking-wider">
								THE ARTIST
							</h3>
							<p className="text-gray-300">
								VP and Co-Founder of{" "}
								<a
									className="underline relative"
									target="_blank"
									rel="noopener noreferrer"
									href="https://www.electricbombay.com"
								>
									Electric Bombay Records
									<ExternalLink className="h-2 w-2 absolute top-0 -right-2" />
								</a>
								.
							</p>
							<p className="text-gray-300">
								From the decks as a DJ to the studios as a music
								producer, ASTYN lives by and for music. Born in
								San Jose, Costa Rica, his connection to
								electronic beats began at an early age,
								influenced by icons such as Skrillex, David
								Guetta, Afrojack and Avicii.
							</p>
							<p className="text-gray-300">
								With a refined ear and a natural instinct for
								production, combined with his dedication to
								music, he has explored and mastered genres such
								as Tech House, Bass House, Trap EDM and Dubstep,
								as well as demonstrating his versatility by
								creating beats for Hip Hop and Trap
							</p>

							{/* Genre tags */}
							<div className="flex flex-wrap gap-2 mt-4">
								{[
									"DUBSTEP",
									"TRAP",
									"HIP HOP",
									"RAP",
									"BASS HOUSE",
									"TECH HOUSE",
								].map((tag) => (
									<span
										key={tag}
										className="text-xs bg-gray-900 border border-gray-700 px-2 py-1 text-gray-400"
									>
										{tag}
									</span>
								))}
							</div>
						</div>

						{/* <div className="space-y-4">
							<h3 className="text-2xl font-bold text-yellow-400 uppercase tracking-wider">
								UPCOMING SHOWS
							</h3>
							<div className="space-y-3">
								<motion.div
									className="flex justify-between items-center border-b border-gray-800 pb-2"
									whileHover={{ x: 5 }}
								>
									<div>
										<p className="font-medium text-white uppercase">
											WAREHOUSE 23
										</p>
										<p className="text-sm text-gray-400 flex items-center">
											<MapPin className="h-3 w-3 mr-1" /> BROOKLYN, NY
										</p>
									</div>
									<div>
										<p className="text-yellow-400 flex items-center">
											<Calendar className="h-4 w-4 mr-1" /> 15.06.24
										</p>
										<p className="text-xs text-gray-500 text-right">
											23:00 - 05:00
										</p>
									</div>
								</motion.div>
								<motion.div
									className="flex justify-between items-center border-b border-gray-800 pb-2"
									whileHover={{ x: 5 }}
								>
									<div>
										<p className="font-medium text-white uppercase">WARNING</p>
										<p className="text-sm text-gray-400 flex items-center">
											<MapPin className="h-3 w-3 mr-1" /> LOS ANGELES, CA
										</p>
									</div>
									<div>
										<p className="text-yellow-400 flex items-center">
											<Calendar className="h-4 w-4 mr-1" /> 22.07.24
										</p>
										<p className="text-xs text-gray-500 text-right">
											22:00 - 06:00
										</p>
									</div>
								</motion.div>

								<motion.div
									className="flex justify-between items-center border-b border-gray-800 pb-2"
									whileHover={{ x: 5 }}
								>
									<div>
										<p className="font-medium text-white uppercase">
											SECRET LOCATION
										</p>
										<p className="text-sm text-gray-400 flex items-center">
											<MapPin className="h-3 w-3 mr-1" /> DETROIT, MI
										</p>
									</div>
									<div>
										<p className="text-yellow-400 flex items-center">
											<Calendar className="h-4 w-4 mr-1" /> 30.08.24
										</p>
										<p className="text-xs text-gray-500 text-right">TBA</p>
									</div>
								</motion.div>
							</div>
						</div> */}

						{/* <Button className="bg-yellow-400 text-black hover:bg-yellow-300 uppercase tracking-wider relative overflow-hidden group">
							<span className="relative z-10">ALL SHOWS</span>
							<span className="absolute inset-0 bg-yellow-400/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
						</Button> */}
					</motion.div>
				</div>
			</div>
		</section>
	);
}
