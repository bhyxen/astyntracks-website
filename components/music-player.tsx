// "use client";

// import { useState, useRef, useEffect } from "react";
// import {
// 	Play,
// 	Pause,
// 	SkipBack,
// 	SkipForward,
// 	Volume2,
// 	VolumeX,
// 	Minimize2,
// 	Maximize2,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Slider } from "@/components/ui/slider";
// import { motion, AnimatePresence } from "framer-motion";

// // Sample tracks - replace with your actual tracks
// const tracks = [
// 	{
// 		id: 1,
// 		title: "BLACKOUT",
// 		artist: "ASTYN",
// 		cover: "/placeholder.svg?height=80&width=80",
// 		audio:
// 			"https://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg", // placeholder
// 	},
// 	{
// 		id: 2,
// 		title: "STATIC",
// 		artist: "ASTYN",
// 		cover: "/placeholder.svg?height=80&width=80",
// 		audio:
// 			"https://commondatastorage.googleapis.com/codeskulptor-assets/Evillainfantasy.ogg", // placeholder
// 	},
// 	{
// 		id: 3,
// 		title: "UNDERGROUND",
// 		artist: "ASTYN",
// 		cover: "/placeholder.svg?height=80&width=80",
// 		audio:
// 			"https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3", // placeholder
// 	},
// ];

// export default function MusicPlayer() {
// 	const [currentTrack, setCurrentTrack] = useState(tracks[0]);
// 	const [isPlaying, setIsPlaying] = useState(false);
// 	const [progress, setProgress] = useState(0);
// 	const [duration, setDuration] = useState(0);
// 	const [volume, setVolume] = useState(80);
// 	const [isMuted, setIsMuted] = useState(false);
// 	const [isMinimized, setIsMinimized] = useState(false);

// 	const audioRef = useRef<HTMLAudioElement>(null);

// 	const [glitchActive, setGlitchActive] = useState(false);

// 	// Randomly trigger glitch effect
// 	useEffect(() => {
// 		const glitchInterval = setInterval(() => {
// 			if (Math.random() > 0.8) {
// 				setGlitchActive(true);
// 				setTimeout(() => setGlitchActive(false), Math.random() * 200 + 100);
// 			}
// 		}, Math.random() * 8000 + 5000);

// 		return () => clearInterval(glitchInterval);
// 	}, []);

// 	// Handle play/pause
// 	const togglePlay = () => {
// 		if (audioRef.current) {
// 			if (isPlaying) {
// 				audioRef.current.pause();
// 			} else {
// 				audioRef.current.play();
// 			}
// 			setIsPlaying(!isPlaying);
// 		}
// 	};

// 	// Handle track change
// 	const changeTrack = (direction: "next" | "prev") => {
// 		const currentIndex = tracks.findIndex(
// 			(track) => track.id === currentTrack.id
// 		);
// 		let newIndex;

// 		if (direction === "next") {
// 			newIndex = (currentIndex + 1) % tracks.length;
// 		} else {
// 			newIndex = (currentIndex - 1 + tracks.length) % tracks.length;
// 		}

// 		setCurrentTrack(tracks[newIndex]);
// 		setIsPlaying(true);
// 		setProgress(0);

// 		// Small timeout to ensure the audio source has changed
// 		setTimeout(() => {
// 			if (audioRef.current) {
// 				audioRef.current.play();
// 			}
// 		}, 100);
// 	};

// 	// Handle volume change
// 	const handleVolumeChange = (value: number[]) => {
// 		const newVolume = value[0];
// 		setVolume(newVolume);

// 		if (audioRef.current) {
// 			audioRef.current.volume = newVolume / 100;
// 		}

// 		if (newVolume === 0) {
// 			setIsMuted(true);
// 		} else {
// 			setIsMuted(false);
// 		}
// 	};

// 	// Handle mute toggle
// 	const toggleMute = () => {
// 		if (audioRef.current) {
// 			if (isMuted) {
// 				audioRef.current.volume = volume / 100;
// 			} else {
// 				audioRef.current.volume = 0;
// 			}
// 			setIsMuted(!isMuted);
// 		}
// 	};

// 	// Update progress
// 	const updateProgress = () => {
// 		if (audioRef.current) {
// 			const currentProgress =
// 				(audioRef.current.currentTime / audioRef.current.duration) * 100;
// 			setProgress(currentProgress);
// 		}
// 	};

// 	// Set duration when metadata is loaded
// 	const handleLoadedMetadata = () => {
// 		if (audioRef.current) {
// 			setDuration(audioRef.current.duration);
// 		}
// 	};

// 	// Handle seeking
// 	const handleSeek = (value: number[]) => {
// 		const seekTime = (value[0] / 100) * duration;

// 		if (audioRef.current) {
// 			audioRef.current.currentTime = seekTime;
// 			setProgress(value[0]);
// 		}
// 	};

// 	// Format time
// 	const formatTime = (time: number) => {
// 		if (isNaN(time)) return "0:00";

// 		const minutes = Math.floor(time / 60);
// 		const seconds = Math.floor(time % 60);
// 		return `${minutes}:${seconds.toString().padStart(2, "0")}`;
// 	};

// 	// Handle track end
// 	const handleTrackEnd = () => {
// 		changeTrack("next");
// 	};

// 	// Toggle minimized view
// 	const toggleMinimized = () => {
// 		setIsMinimized(!isMinimized);
// 	};

// 	return (
// 		<>
// 			<audio
// 				ref={audioRef}
// 				src={currentTrack.audio}
// 				onTimeUpdate={updateProgress}
// 				onLoadedMetadata={handleLoadedMetadata}
// 				onEnded={handleTrackEnd}
// 			/>

// 			<AnimatePresence>
// 				{!isMinimized ? (
// 					<motion.div
// 						className="fixed bottom-0 left-0 right-0 z-30 bg-black border-t border-yellow-400/20 h-16"
// 						initial={{ y: 100 }}
// 						animate={{ y: 0 }}
// 						exit={{ y: 100 }}
// 						transition={{ duration: 0.3 }}
// 					>
// 						{/* Glitch overlay */}
// 						{glitchActive && (
// 							<>
// 								<div
// 									className="absolute inset-0 bg-red-500/10 mix-blend-multiply z-0"
// 									style={{
// 										transform: `translateX(${Math.random() * 5 - 2.5}px)`,
// 									}}
// 								/>
// 								<div
// 									className="absolute inset-0 bg-blue-500/10 mix-blend-multiply z-0"
// 									style={{
// 										transform: `translateX(${Math.random() * -5 + 2.5}px)`,
// 									}}
// 								/>
// 								{Array.from({ length: 3 }).map((_, i) => (
// 									<motion.div
// 										key={`player-glitch-${i}`}
// 										className="absolute h-[1px] bg-yellow-400/30 z-0"
// 										style={{
// 											top: `${Math.random() * 100}%`,
// 											left: 0,
// 											right: 0,
// 										}}
// 										animate={{
// 											opacity: [0, 0.8, 0],
// 											scaleX: [0, 1, 0],
// 										}}
// 										transition={{ duration: 0.2 }}
// 									/>
// 								))}
// 							</>
// 						)}
// 						<div className="container mx-auto px-4">
// 							{/* Main Player Controls */}
// 							<div className="flex items-center h-16">
// 								{/* Track Info */}
// 								<div className="flex items-center space-x-3 w-1/4">
// 									<img
// 										src={currentTrack.cover || "/placeholder.svg"}
// 										alt={currentTrack.title}
// 										className="h-10 w-10 filter grayscale"
// 									/>
// 									<div className="hidden sm:block">
// 										<h4 className="text-white font-medium truncate uppercase tracking-wider relative">
// 											{currentTrack.title}
// 											{glitchActive && (
// 												<motion.span
// 													className="absolute inset-0 text-yellow-400 opacity-70"
// 													style={{
// 														clipPath: `inset(${Math.random() * 50}% 0 ${
// 															Math.random() * 50
// 														}% 0)`,
// 														transform: `translate(${Math.random() * 4 - 2}px, ${
// 															Math.random() * 4 - 2
// 														}px)`,
// 													}}
// 												>
// 													{currentTrack.title}
// 												</motion.span>
// 											)}
// 										</h4>
// 										<p className="text-gray-400 text-sm truncate uppercase">
// 											{currentTrack.artist}
// 										</p>
// 									</div>
// 								</div>

// 								{/* Player Controls */}
// 								<div className="flex items-center justify-center flex-1">
// 									<div className="flex items-center space-x-4">
// 										<Button
// 											variant="ghost"
// 											size="icon"
// 											className="text-gray-400 hover:text-white hover:bg-yellow-400/10"
// 											onClick={() => changeTrack("prev")}
// 										>
// 											<SkipBack className="h-5 w-5" />
// 										</Button>

// 										<Button
// 											variant="outline"
// 											size="icon"
// 											className="text-white border-yellow-400 hover:bg-yellow-400/10 h-8 w-8"
// 											onClick={togglePlay}
// 										>
// 											{isPlaying ? (
// 												<Pause className="h-4 w-4" />
// 											) : (
// 												<Play className="h-4 w-4" />
// 											)}
// 										</Button>

// 										<Button
// 											variant="ghost"
// 											size="icon"
// 											className="text-gray-400 hover:text-white hover:bg-yellow-400/10"
// 											onClick={() => changeTrack("next")}
// 										>
// 											<SkipForward className="h-5 w-5" />
// 										</Button>
// 									</div>
// 								</div>

// 								{/* Volume & Minimize Controls */}
// 								<div className="flex items-center justify-end space-x-3 w-1/4">
// 									<div className="hidden md:flex items-center space-x-2">
// 										<Button
// 											variant="ghost"
// 											size="icon"
// 											className="text-gray-400 hover:text-white hover:bg-yellow-400/10"
// 											onClick={toggleMute}
// 										>
// 											{isMuted ? (
// 												<VolumeX className="h-5 w-5" />
// 											) : (
// 												<Volume2 className="h-5 w-5" />
// 											)}
// 										</Button>

// 										<Slider
// 											value={[isMuted ? 0 : volume]}
// 											onValueChange={handleVolumeChange}
// 											max={100}
// 											step={1}
// 											className="w-20 [&>span:first-child]:h-1 [&>span:first-child]:bg-gray-800 [&_[role=slider]]:bg-yellow-400 [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-yellow-400 [&_[role=slider]:focus-visible]:ring-0 [&_[role=slider]:focus-visible]:ring-offset-0"
// 										/>
// 									</div>

// 									<Button
// 										variant="ghost"
// 										size="icon"
// 										className="text-gray-400 hover:text-white hover:bg-yellow-400/10"
// 										onClick={toggleMinimized}
// 									>
// 										<Minimize2 className="h-5 w-5" />
// 									</Button>
// 								</div>
// 							</div>
// 						</div>
// 					</motion.div>
// 				) : (
// 					<motion.div
// 						className="fixed bottom-4 right-4 z-30 bg-black border border-yellow-400/30 rounded-full p-2"
// 						initial={{ scale: 0 }}
// 						animate={{ scale: 1 }}
// 						exit={{ scale: 0 }}
// 						transition={{ duration: 0.2 }}
// 						whileHover={{ scale: 1.1 }}
// 					>
// 						<Button
// 							variant="ghost"
// 							size="icon"
// 							className="text-white hover:bg-yellow-400/10 h-10 w-10 rounded-full"
// 							onClick={toggleMinimized}
// 						>
// 							<Maximize2 className="h-5 w-5" />
// 						</Button>
// 						{isPlaying && (
// 							<div className="absolute inset-0 border border-yellow-400 rounded-full animate-pulse"></div>
// 						)}
// 					</motion.div>
// 				)}
// 			</AnimatePresence>
// 		</>
// 	);
// }
