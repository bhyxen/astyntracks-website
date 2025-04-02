import { NextResponse } from "next/server";
import { Resend } from "resend";
import { htmlEmailTemplate } from "@/lib/htmlEmailTemplate";

type emailDetails = {
	name: string;
	email: string;
	message: string;
};

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendMessage = async ({ name, email, message }: emailDetails) => {
	try {
		resend.emails.send({
			from: process.env.EMAIL_FROM as string,
			to: "astyntracks@gmail.com",
			subject: "NEW MESSAGE FROM WEBSITE (https://www.astyntracks.com)",
			html: htmlEmailTemplate({
				name: name,
				email: email,
				message: message,
			}),
		});

		return NextResponse.json({ message: "Email sent successfully" });
	} catch (error) {
		console.error("Error sending email:", error);
		return NextResponse.json(
			{ error: "Failed to send email" },
			{ status: 500 },
		);
	}
};
