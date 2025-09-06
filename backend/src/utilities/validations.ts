import {z} from 'zod';


export const StrongPassword = z
  .string()
  .min(8, "Min 8 characters")
  .max(72, "Max 72 characters")
  .regex(/[A-Z]/, "Include at least one uppercase letter")
  .regex(/[a-z]/, "Include at least one lowercase letter")
  .regex(/\d/, "Include at least one number")
  .regex(/[^A-Za-z0-9]/, "Include at least one special character");

export const StrongAuthSchema = z.object({
  email: z.string().trim().toLowerCase().email("Invalid email"),
  password: StrongPassword,
});

