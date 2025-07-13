import { NextRequest, NextResponse } from "next/server";
import { sendBookingEmail } from "@/lib/resend";

export async function POST(request: NextRequest) {
  try {
    const bookingData = await request.json();

    console.log("API Route - Resend Key:", process.env.RESEND_API_KEY); // ← Aqui vai funcionar

    const result = await sendBookingEmail(bookingData);

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Erro na API route:", error);
    return NextResponse.json(
      { success: false, error: "Falha ao enviar email" },
      { status: 500 },
    );
  }
}
