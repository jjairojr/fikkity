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
        reference_images: data.referenceImages || [],
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

export const createImagesOnStorage = async (referenceImages: File[]) => {
  if (!referenceImages || referenceImages.length === 0) return undefined;

  const imageUrls: string[] = [];

  const now = Date.now();

  for (const file of referenceImages) {
    const filePath = `reference-images/${now}/${file.name}`;
    const { data, error } = await supabase.storage
      .from("reference-images")
      .upload(filePath, file);

    if (error) {
      console.error("Erro ao fazer upload da imagem:", error);
    }

    if (data) {
      const { data: urlData } = supabase.storage
        .from("reference-images")
        .getPublicUrl(filePath);

      imageUrls.push(urlData.publicUrl);
    }
  }

  return imageUrls.length > 0 ? imageUrls : undefined;
};
