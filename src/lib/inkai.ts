import { bookingSchema } from "@/validations/booking";
import z from "zod";

const inkaiApiUrl = process.env.NEXT_PUBLIC_INKAI_API_URL;
const inkaiStudioId = process.env.NEXT_PUBLIC_INKAI_STUDIO_ID;

interface CreateQuoteResponse {
  quote_id: string;
}

export const createInkaiQuote = async (
  data: z.infer<typeof bookingSchema>,
  files?: File[],
): Promise<CreateQuoteResponse | null> => {
  if (!inkaiApiUrl || !inkaiStudioId) {
    console.warn("Inkai API not configured, skipping quote creation");
    return null;
  }

  const formData = new FormData();


  const quoteData = {
    studio_id: inkaiStudioId,
    name: data.name,
    email: data.email,
    phone: data.phone,
    age: parseInt(data.age),
    style: data.style || undefined,
    body_part: data.bodyPart,
    size: data.size || undefined,
    description: data.description || undefined,
    budget: data.budget || "",
    preferred_date: data.preferredDate ? new Date(data.preferredDate).toISOString() : undefined,
    preferred_time: data.preferredDate && data.preferredTime
      ? new Date(`${data.preferredDate}T${data.preferredTime}:00`).toISOString()
      : undefined,
    location: data.location || undefined,
    is_first_tattoo: data.isFirstTattoo || false,
    has_allergies: data.hasAllergies || false,
    allergies_description: data.allergiesDescription || undefined,
    status: "pending",
  };

  formData.append("data", JSON.stringify(quoteData));

  if (files && files.length > 0) {
    files.forEach((file) => {
      formData.append("reference_images", file);
    });
  }

  const response = await fetch(`${inkaiApiUrl}/quotes`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Inkai API error:", errorText);
    throw new Error(`Failed to create quote: ${response.status}`);
  }

  return response.json();
};
