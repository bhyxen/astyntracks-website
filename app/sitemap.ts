import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: "https://www.astynmusic.com",
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 1.0,
		},
	];
}
