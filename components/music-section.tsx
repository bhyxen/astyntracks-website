"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Disc, Play, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { AdvancedImage } from "@cloudinary/react";
import { cloudinary } from "@/lib/cloudinary";
import { auto } from "@cloudinary/url-gen/actions/resize";
import CustomButton from "./customButton";

const releases = [
	{
		id: 1,
		title: "ASTYN - Chills",
		type: "SINGLE",
		year: 2025,
		cover: "astyn-chills_ytivsq", // Cloudinary public ID
		link: "https://open.spotify.com/track/1PTikxoFHbx4VIE26Lekd7?si=ec7bd8974d674729",
	},
	{
		id: 2,
		title: "Quevedo - Cuéntale",
		type: "ASTYN REMIX",
		year: 2023,
		cover: "quevedo-cuentale-astyn-remix_eclbrr", // Cloudinary public ID
		link: "https://music.youtube.com/watch?v=gMzF4AbP9ow&si=hb5mVw2xjqhTn77T",
	},
	{
		id: 3,
		title: "Karol G, Quevedo - Pero Tú",
		type: "ASTYN REMIX",
		year: 2023,
		cover: "pero-tu-astyn-remix_g3k2lh", // Cloudinary public ID
		link: "https://music.youtube.com/watch?v=iaKZxwrUFt4&si=CWg8A1AMdgwG6nfN",
	},
];

const mixes = [
	{
		id: 1,
		title: "ALL HOUSE SET VOL. 01",
		duration: "31:44",
		cover: "astyn-all-house-set-1_u6288u", // Cloudinary public ID
		link: "https://music.youtube.com/watch?v=SIna1XLVFhU&si=2r4ZFUwhOifkbpZ2",
	},
	{
		id: 2,
		title: "ALL HOUSE SET VOL. 02",
		duration: "17:41",
		cover: "astyn-all-house-set-2_iadf1q", // Cloudinary public ID
		link: "https://music.youtube.com/watch?v=YeEERBDnu4M&si=1pUX0r5ECa1Ta8KX",
	},
];

export default function MusicSection() {
	// Glitch effect state
	const [glitchActive, setGlitchActive] = useState(false);

	useEffect(() => {
		const glitchInterval = setInterval(
			() => {
				if (Math.random() > 0.7) {
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
		<section className="py-20 relative bg-black overflow-x-hidden">
			{/* Digital distortion overlay */}
			<div
				className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
				style={{
					backgroundImage:
						"url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJuIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC45IiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiMwMDAiLz48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsdGVyPSJ1cmwoI24pIiBvcGFjaXR5PSIwLjQiLz48L3N2Zz4=')",
					backgroundSize: "100px",
				}}
			></div>

			{/* Glitch blocks - random rectangles */}
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

			{/* RGB split effect */}
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
			<div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIwLjA1Ii8+PC9zdmc+')]"></div>

			{/* Concrete texture overlay */}
			<div
				className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
				style={{
					backgroundImage:
						"url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjA1IiBudW1PY3RhdmVzPSI1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1IiBkPSJNMCAwaDUwMHY1MDBIMHoiLz48L3N2Zz4=')",
					backgroundSize: "cover",
				}}
			></div>

			{/* Static/glitch lines */}
			<div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5">
				{Array.from({ length: 5 }).map((_, i) => (
					<div
						key={i}
						className="absolute bg-gray-400 h-[1px]"
						style={{
							top: `${Math.random() * 100}%`,
							left: 0,
							right: 0,
							opacity: Math.random() * 0.5 + 0.25,
							transform: `translateY(${Math.random() * 10}px)`,
							height: `${Math.random() * 2}px`,
						}}
					></div>
				))}
			</div>

			<motion.div
				className="text-center mb-16"
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.5 }}
			>
				<h2 className="text-5xl font-bold mb-4 text-white uppercase tracking-widest relative inline-block">
					MUSIC
					<span className="absolute -top-1 -right-4 w-3 h-3 bg-yellow-400 opacity-70"></span>
				</h2>
				<div className="h-1 w-20 bg-yellow-400 mx-auto"></div>
			</motion.div>

			<div className="max-w-4xl mx-auto px-4">
				<Tabs defaultValue="releases" className="w-full">
					<div className="flex justify-center">
						<TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12 bg-black border border-gray-800">
							<TabsTrigger
								value="releases"
								className="cursor-pointer text-lg data-[state=active]:bg-yellow-400/10 data-[state=active]:text-yellow-400 uppercase tracking-wider"
							>
								Releases
							</TabsTrigger>
							<TabsTrigger
								value="mixes"
								className="cursor-pointer text-lg data-[state=active]:bg-yellow-400/10 data-[state=active]:text-yellow-400 uppercase tracking-wider"
							>
								Mixes
							</TabsTrigger>
						</TabsList>
					</div>

					<TabsContent value="releases">
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							{releases.map((release, index) => (
								<motion.div
									key={release.id}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{
										duration: 0.5,
										delay: index * 0.1,
									}}
									className="border-b border-gray-800 pb-6"
								>
									<a
										href={release.link}
										target="_blank"
										rel="noopener noreferrer"
										className="group grid gap-4 grid-cols-2 md:grid-cols-1 justify-start items-start"
									>
										<div className="relative overflow-hidden">
											{/* Cloudinary image for release */}
											<AdvancedImage
												cldImg={cloudinary
													.image(release.cover)
													.format("auto")
													.quality("auto")
													.resize(
														auto()
															.width(300)
															.height(300),
													)}
												className="w-full aspect-square object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
												alt={release.title}
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

											{/* Torn corner effect */}
											<div className="absolute -bottom-2 -right-2 w-8 h-8 bg-black transform rotate-45 translate-x-2 translate-y-2"></div>

											<div className="absolute inset-0 bg-black/50 md:opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
												<Button className="bg-black/70 hover:text-black text-yellow-400 md:bg-yellow-400 md:text-black hover:bg-yellow-300 uppercase tracking-wider cursor-pointer rounded-full">
													<Play />
												</Button>
											</div>
										</div>
										<div className="md:mt-3 flex justify-between flex-col gap-4">
											<div>
												<h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors uppercase tracking-wider">
													{release.title}
												</h3>
												<div className="flex md:items-center text-gray-400 mb-4 text-sm flex-col md:flex-row gap-2">
													<span className="flex items-center">
														<Clock className="h-3 w-3 mr-1" />
														<span>
															{release.type}
														</span>
													</span>

													<span className="hidden md:inline">
														•
													</span>
													<span className="flex items-center">
														<Calendar className="h-3 w-3 mr-1" />
														{release.year}
													</span>
												</div>
											</div>
											{/* <div className="flex gap-4 md:hidden">
												<CustomButton variant="ghost">
													<Play className="h-4 w-4 mr-2" />{" "}
													LISTEN
												</CustomButton>
											</div> */}
										</div>
									</a>
								</motion.div>
							))}
						</div>
						<CustomButton className="mt-8 w-full">
							<a
								href="https://linktr.ee/astyntracks"
								target="_blank"
								rel="noopener noreferrer"
								className="uppercase tracking-wider flex justify-center items-center"
							>
								<Play className="h-4 w-4 mr-2" /> LISTEN ALL
								RELEASES
							</a>
						</CustomButton>
					</TabsContent>

					<TabsContent value="mixes">
						<div className="space-y-6">
							{mixes.map((mix, index) => (
								<motion.div
									key={mix.id}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{
										duration: 0.5,
										delay: index * 0.1,
									}}
									className="border-b border-gray-800 pb-6"
								>
									<div className="grid gap-4 grid-cols-2 md:flex">
										<div className="md:w-1/4 relative">
											{/* Cloudinary image for mix */}
											<AdvancedImage
												cldImg={cloudinary
													.image(mix.cover)
													.format("auto")
													.quality("auto")
													.resize(
														auto()
															.width(300)
															.height(300),
													)}
												className="w-full aspect-square object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
												alt={mix.title}
											/>
										</div>
										<div className="md:w-3/4 flex flex-col justify-between">
											<div>
												<h3 className="text-xl font-bold text-white uppercase tracking-wider mb-2">
													{mix.title}
												</h3>
												<div className="flex md:items-center text-gray-400 mb-4 text-sm flex-col md:flex-row gap-2">
													<span className="flex items-center">
														<Clock className="h-3 w-3 mr-1" />
														<span>
															{mix.duration}
														</span>
													</span>

													<span className="hidden md:inline">
														•
													</span>
													<span className="flex items-center">
														<Disc className="h-3 w-3 mr-1" />
														<span>LIVE SET</span>
													</span>
												</div>
											</div>

											<div className="flex gap-4">
												<CustomButton variant="outline">
													<a
														href={mix.link}
														target="_blank"
														rel="noopener noreferrer"
														className="uppercase tracking-wider flex"
													>
														<Play className="h-4 w-4 mr-2" />{" "}
														LISTEN
													</a>
												</CustomButton>
											</div>
										</div>
									</div>
								</motion.div>
							))}
						</div>
						<CustomButton className="mt-8 w-full">
							<a
								href="https://linktr.ee/astyntracks"
								target="_blank"
								rel="noopener noreferrer"
								className="uppercase tracking-wider flex justify-center items-center"
							>
								<Play className="h-4 w-4 mr-2" /> LISTEN ALL
								MIXES
							</a>
						</CustomButton>
					</TabsContent>
				</Tabs>
			</div>
		</section>
	);
}
