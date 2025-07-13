import { bookingSchema } from "@/validations/booking";
import { createClient } from "@supabase/supabase-js";
import z from "zod";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const createBooking = async (data: z.infer<typeof bookingSchema>) => {
  const { data: booking, error } = await supabase
    .from("bookings")
    .insert([
      {
        name: data.name,
        email: data.email,
        phone: data.phone,
        age: parseInt(data.age),
        style: data.style,
        body_part: data.bodyPart,
        size: data.size,
        description: data.description,
        budget: data.budget,
        preferred_date: data.preferredDate,
        preferred_time: data.preferredTime,
        location: data.location,
        is_first_tattoo: data.isFirstTattoo,
        has_allergies: data.hasAllergies,
        allergies_description: data.allergiesDescription,
        reference_images: [],
        status: "pending",
      },
    ])
    .select();

  if (error) {
    console.error("Erro ao salvar:", error);
    throw error;
  }

  return booking[0];
};
