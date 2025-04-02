"use client";

import { motion } from "framer-motion";

import {
	SiInstagram,
	SiYoutubemusic,
	SiYoutube,
	SiApplemusic,
	SiSoundcloud,
	SiSpotify,
} from "@icons-pack/react-simple-icons";

const socials = [
	{
		name: "Instagram",
		icon: SiInstagram,
		url: "https://instagram.com/astyntracks",
	},
	{
		name: "YouTube",
		icon: SiYoutube,
		url: "https://youtube.com/@astyntracks",
	},
	{
		name: "Spotify",
		icon: SiSpotify,
		url: "https://open.spotify.com/artist/29cHicpmhIPyGAAtP2R3yk",
	},
	{
		name: "Apple Music",
		icon: SiApplemusic,
		url: "https://music.apple.com/artist/astyn/1800828861",
	},
	{
		name: "SoundCloud",
		icon: SiSoundcloud,
		url: "https://soundcloud.com/astyntracks",
	},
	{
		name: "YouTube Music",
		icon: SiYoutubemusic,
		url: "https://music.youtube.com/channel/UC4r-5QLhf9dcQe8h_4iOAqQ",
	},
];

export default function SocialLinks() {
	return (
		<section className="py-20 relative bg-black">
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
			<div className="absolute top-[20%] left-[15%] w-16 h-16 border border-gray-700 opacity-10 rotate-45"></div>
			<div className="absolute bottom-[30%] right-[10%] w-12 h-12 bg-gray-800 opacity-5"></div>

			<motion.div
				className="text-center mb-16"
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.5 }}
			>
				<h2 className="text-5xl font-bold mb-4 text-white uppercase tracking-widest relative inline-block">
					FOLLOW
					<span className="absolute -top-1 -right-4 w-3 h-3 bg-yellow-400 opacity-70"></span>
				</h2>
				<div className="h-1 w-20 bg-yellow-400 mx-auto"></div>
			</motion.div>

			<div className="max-w-4xl mx-auto px-4">
				<div className="grid grid-cols-3 md:grid-cols-6 gap-4">
					{socials.map((social, index) => {
						const { url, icon: Icon, name } = social;

						return (
							<motion.a
								key={name}
								href={url}
								target="_blank"
								rel="noopener noreferrer"
								className="flex flex-col items-center justify-center py-6 text-white hover:text-yellow-400 transition-colors relative group"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.1 }}
								whileHover={{ y: -5 }}
							>
								<Icon className="h-8 w-8 mb-3" />
								<span className="text-sm uppercase tracking-wider relative text-center">
									{social.name}
									<span className="absolute bottom-0 left-0 w-0 h-[1px] bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
								</span>

								{/* Glitch effect on hover */}
								<motion.div
									className="absolute inset-0 bg-yellow-400/5 opacity-0"
									initial={{ opacity: 0 }}
									whileHover={{
										opacity: [0, 0.5, 0, 0.3, 0],
										x: [0, -2, 2, -1, 0],
										y: [0, 1, -1, 1, 0],
									}}
									transition={{ duration: 0.5 }}
								/>
							</motion.a>
						);
					})}
				</div>
			</div>

			{/* Fictious coordinates */}
			<div className="max-w-4xl mx-auto mt-12 px-4 text-center">
				<div className="text-xs text-yellow-400/50 font-mono mb-4">
					91°00&apos;00.0&quot;N 181°00&apos;00.0&quot;W
				</div>
			</div>

			<div className="max-w-4xl mx-auto mt-8 px-4">
				<div className="text-center text-gray-500 text-sm">
					<p>
						© {new Date().getFullYear()} ASTYN. ALL RIGHTS
						RESERVED.
					</p>
				</div>
			</div>
		</section>
	);
}
