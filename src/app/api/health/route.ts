import { NextResponse } from "next/server";
import { ludwittConfigured } from "@/lib/ludwitt";

export async function GET() {
  return NextResponse.json({
    ok: true,
    app: "ai-investment-learning-simulator",
    ludwittConfigured: ludwittConfigured(),
    appId: process.env.LUDWITT_APP_ID || null,
  });
}
