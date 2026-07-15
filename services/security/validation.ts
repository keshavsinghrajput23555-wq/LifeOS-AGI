import { z } from 'zod';

export const uploadSchema = z.object({
  formType: z.enum(['income', 'caste', 'residence']),
  documentType: z.enum(['aadhaar', 'income_proof', 'ration_card', 'photo'])
});

export const phoneSchema = z.object({ phone: z.string().regex(/^\+91\d{10}$/) });
