import { Cloudinary } from "@cloudinary/url-gen/index";

// Initialize Cloudinary
export const cloudinary = new Cloudinary({
	cloud: {
		cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, // Replace with your Cloudinary cloud name
	},
});
