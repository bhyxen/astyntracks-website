import Hero from "@/components/hero";
import AboutSection from "@/components/about-section";
import MusicSection from "@/components/music-section";
import ContactSection from "@/components/contact-section";
import SocialLinks from "@/components/social-links";
import Navbar from "@/components/navbar";
// import MusicPlayer from "@/components/music-player";
import SectionDivider from "@/components/section-divider";

export default function Home() {
	return (
		<main className="min-h-screen bg-black text-white">
			<Navbar />
			<div id="home">
				<Hero />
			</div>
			<div id="about">
				<AboutSection />
			</div>
			<SectionDivider />
			<div id="music">
				<MusicSection />
			</div>
			<SectionDivider />
			<div id="contact">
				<ContactSection />
			</div>
			<SectionDivider />
			<div id="follow">
				<SocialLinks />
			</div>
			{/* <MusicPlayer /> */}
		</main>
	);
}
