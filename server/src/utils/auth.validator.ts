import { z } from "zod";

export const registerSchema = z.object({
  displayname: z.string(),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)/, {
      message: "Password must contain at least one letter and one number",
    }),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string(),
});

export const verifySchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  token: z
    .string()
    .length(6, { message: "Token must be 6 digits" })
    .regex(/^\d+$/, { message: "Token must contain only digits" }),
});

export const forgotSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});
