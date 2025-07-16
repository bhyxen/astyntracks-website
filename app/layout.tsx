import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";

// ✅ Preferred way to define metadata in Next.js 15.2.4
export function generateMetadata(): Metadata {
	return {
		title: "ASTYN | Music Producer & DJ",
		description: "Official website of ASTYN - Music Producer & DJ",
		openGraph: {
			title: "ASTYN | Music Producer & DJ",
			description:
				"Explore the official website of ASTYN - Music Producer & DJ.",
			url: "https://www.astynmusic.com",
			siteName: "ASTYN",
			images: [
				{
					url: "https://www.astynmusic.com/og-image.png",
					width: 1200,
					height: 630,
					alt: "ASTYN - Music Producer & DJ",
				},
			],
			type: "website",
		},
		twitter: {
			card: "summary_large_image",
			title: "ASTYN | Music Producer & DJ",
			description: "Official website of ASTYN - Music Producer & DJ",
			images: ["https://www.astynmusic.com/og-image.png"],
			creator: "@astyntracks",
		},
		icons: {
			icon: "/favicon.ico",
			apple: "/apple-touch-icon.png",
		},
		robots: "index, follow",
	};
}

// ✅ Move viewport to its own export
export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1.0,
	themeColor: "#fcc800",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className="dark">
			<head>
				<link rel="canonical" href="https://www.astynmusic.com" />
			</head>
			<body className="min-h-screen bg-black scroll-smooth">
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem
				>
					<main>{children}</main>
					<Toaster closeButton />
				</ThemeProvider>
				<Analytics />
			</body>
		</html>
	);
}
