import { sendMessage } from "@/controllers/emailController";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
	const body = await req.json();
	return sendMessage(body);
}
