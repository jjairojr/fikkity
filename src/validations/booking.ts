import { z } from "zod";

export const bookingSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos"),
  age: z.string().refine((val) => {
    const age = parseInt(val);
    return age >= 18 && age <= 100;
  }, "Idade deve ser entre 18 e 100 anos"),

  style: z.string().min(1, "Selecione um estilo"),
  bodyPart: z.string().min(1, "Selecione o local do corpo"),
  size: z.string().min(1, "Selecione o tamanho"),
  description: z
    .string()
    .min(10, "Descrição deve ter pelo menos 10 caracteres"),
  budget: z.string().optional(),

  preferredDate: z.string().min(1, "Selecione uma data"),
  preferredTime: z.string().min(1, "Selecione um horário"),
  location: z.string().min(1, "Selecione um local"),

  isFirstTattoo: z.boolean(),
  hasAllergies: z.boolean(),
  allergiesDescription: z.string().optional(),

  referenceImages: z.array(z.any()).max(3, "Máximo 3 imagens").optional(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;

export const step1Schema = bookingSchema.pick({
  name: true,
  email: true,
  phone: true,
  age: true,
  isFirstTattoo: true,
  hasAllergies: true,
  allergiesDescription: true,
});

export const step2Schema = bookingSchema.pick({
  style: true,
  bodyPart: true,
  size: true,
  description: true,
  budget: true,
});

export const step3Schema = bookingSchema.pick({
  preferredDate: true,
  preferredTime: true,
  location: true,
});
