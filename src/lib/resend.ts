import { Resend } from "resend";
import z from "zod";
import { bookingSchema } from "@/validations/booking";
import { createBookingEmailTemplate } from "@/email-templates/new-booking";

const resend = new Resend(process.env.RESEND_API_KEY!);

export const sendBookingEmail = async (
  bookingData: z.infer<typeof bookingSchema>,
) => {
  try {
    const emailData = {
      from: "onboarding@resend.dev", // ← Teste sem nome
      to: ["jjairojr01@gmail.com"],
      subject: `🎨 Novo Agendamento - ${bookingData.name}`,
      html: createBookingEmailTemplate(bookingData),
    };

    const { data, error } = await resend.emails.send(emailData);

    if (error) {
      console.error("Erro detalhado:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Erro no envio:", error);
    throw error;
  }
};
