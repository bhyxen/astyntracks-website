"use client";

import type React from "react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Mail } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { toast } from "sonner";
import CustomButton from "./customButton";

export default function ContactSection() {
	const [formState, setFormState] = useState({
		name: "",
		email: "",
		message: "",
	});

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const containerRef = useRef(null);
	const isInView = useInView(containerRef, { once: true });

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setFormState({
			...formState,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		const data = {
			name: formData.get("name"),
			email: formData.get("email"),
			message: formData.get("message"),
		};
		setIsSubmitting(true);
		fetch(`/api/contact`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		}).then((response) => {
			if (response.ok) {
				setFormState({
					name: "",
					email: "",
					message: "",
				});
				setIsSubmitting(false);
				setIsSubmitted(true);
				toast.success("Message sent successfully.", {
					description: "I will get back to you soon.",
				});
			} else {
				setIsSubmitting(false);
				toast.error("Please try again.", {
					description: "There was an error sending your message.",
					duration: Infinity,
				});
			}
		});
	};

	return (
		<section
			className="py-20 relative bg-black overflow-x-hidden"
			ref={containerRef}
		>
			{/* Noise texture overlay */}
			<div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>

			{/* Abstract geometric shapes */}
			<div className="absolute top-[30%] right-[10%] w-20 h-20 border border-gray-700 opacity-10 -rotate-12"></div>
			<div className="absolute bottom-[20%] left-[5%] w-12 h-12 bg-gray-800 opacity-5 rotate-45"></div>

			{/* Static/glitch lines */}
			<div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5">
				{Array.from({ length: 3 }).map((_, i) => (
					<div
						key={i}
						className="absolute bg-gray-400 h-[1px]"
						style={{
							top: `${20 + i * 30}%`,
							left: 0,
							right: 0,
							opacity: 0.3,
							height: `${Math.random() * 2}px`,
						}}
					></div>
				))}
			</div>

			<motion.div
				className="text-center mb-16"
				initial={{ opacity: 0, y: 20 }}
				animate={
					isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
				}
				transition={{ duration: 0.5 }}
			>
				<h2 className="text-5xl font-bold mb-4 text-white uppercase tracking-widest relative inline-block">
					CONTACT
					<span className="absolute -top-1 -right-4 w-3 h-3 bg-yellow-400 opacity-70"></span>
				</h2>
				<div className="h-1 w-20 bg-yellow-400 mx-auto"></div>
			</motion.div>

			<div className="max-w-4xl mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
					{/* Contact Info */}
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={
							isInView
								? { opacity: 1, x: 0 }
								: { opacity: 0, x: -20 }
						}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="space-y-8"
					>
						<div>
							<h3 className="text-xl font-bold text-yellow-400 uppercase tracking-wider mb-4">
								GET IN TOUCH
							</h3>
							<p className="text-gray-300 mb-6">
								For bookings, collaborations, or general
								inquiries, reach out directly or use the form.
							</p>

							<div className="space-y-4">
								<div className="flex items-start">
									<Mail className="h-5 w-5 text-yellow-400 mt-1 mr-3" />
									<div>
										<h4 className="text-white font-medium uppercase tracking-wider">
											GENERAL
										</h4>
										<a
											href="mailto:contact@astyntracks.com"
											className="text-gray-300 hover:text-yellow-400 transition-colors"
										>
											contact@astyntracks.com
										</a>
									</div>
								</div>

								<div className="flex items-start">
									<Mail className="h-5 w-5 text-yellow-400 mt-1 mr-3" />
									<div>
										<h4 className="text-white font-medium uppercase tracking-wider">
											BOOKINGS
										</h4>
										<a
											href="mailto:bookings@astyntracks.com"
											className="text-gray-300 hover:text-yellow-400 transition-colors"
										>
											bookings@astyntracks.com
										</a>
									</div>
								</div>

								<div className="flex items-start">
									<Mail className="h-5 w-5 text-yellow-400 mt-1 mr-3" />
									<div>
										<h4 className="text-white font-medium uppercase tracking-wider">
											MANAGEMENT
										</h4>
										<a
											href="mailto:mgmt@astyntracks.com"
											className="text-gray-300 hover:text-yellow-400 transition-colors"
										>
											mgmt@astyntracks.com
										</a>
									</div>
								</div>
							</div>
						</div>

						<div className="h-1 w-full bg-gray-800 md:hidden"></div>
					</motion.div>

					{/* Contact Form */}
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={
							isInView
								? { opacity: 1, x: 0 }
								: { opacity: 0, x: 20 }
						}
						transition={{ duration: 0.5, delay: 0.3 }}
					>
						{isSubmitted ? (
							<div className="text-center py-8">
								<h3 className="text-xl font-bold text-yellow-400 mb-4 uppercase tracking-wider">
									MESSAGE SENT
								</h3>
								<p className="text-gray-300 mb-6">
									Your message has been received. Expect a
									response soon.
								</p>
								<Button
									className="bg-yellow-400 text-black hover:bg-yellow-300 uppercase tracking-wider"
									onClick={() => setIsSubmitted(false)}
								>
									SEND ANOTHER
								</Button>
							</div>
						) : (
							<form onSubmit={handleSubmit} className="space-y-6">
								<div className="space-y-2">
									<label
										htmlFor="name"
										className="text-sm font-medium text-gray-300 uppercase tracking-wider"
									>
										Name
									</label>
									<Input
										id="name"
										name="name"
										value={formState.name}
										onChange={handleChange}
										required
										className="bg-black border-gray-800 focus:border-yellow-400 focus-visible:ring-yellow-400/20"
										placeholder="Your name"
									/>
								</div>

								<div className="space-y-2">
									<label
										htmlFor="email"
										className="text-sm font-medium text-gray-300 uppercase tracking-wider"
									>
										Email
									</label>
									<Input
										id="email"
										name="email"
										type="email"
										value={formState.email}
										onChange={handleChange}
										required
										className="bg-black border-gray-800 focus:border-yellow-400 focus-visible:ring-yellow-400/20"
										placeholder="Your email"
									/>
								</div>

								<div className="space-y-2">
									<label
										htmlFor="message"
										className="text-sm font-medium text-gray-300 uppercase tracking-wider"
									>
										Message
									</label>
									<Textarea
										id="message"
										name="message"
										value={formState.message}
										onChange={handleChange}
										required
										rows={4}
										className="bg-black border-gray-800 focus:border-yellow-400 focus-visible:ring-yellow-400/20"
										placeholder="Your message"
									/>
								</div>

								<CustomButton
									className="w-full"
									type="submit"
									disabled={isSubmitting}
								>
									{isSubmitting ? (
										<span className="flex items-center">
											<svg
												className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
											>
												<circle
													className="opacity-25"
													cx="12"
													cy="12"
													r="10"
													stroke="currentColor"
													strokeWidth="4"
												></circle>
												<path
													className="opacity-75"
													fill="currentColor"
													d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
												></path>
											</svg>
											SENDING...
										</span>
									) : (
										<span className="uppercase tracking-wider flex">
											<Send className="mr-2 h-4 w-4" />
											SEND MESSAGE
										</span>
									)}
								</CustomButton>
							</form>
						)}
					</motion.div>
				</div>
			</div>
		</section>
	);
}
