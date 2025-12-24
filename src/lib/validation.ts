import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.string().email("Email tidak valid"),
    first_name: z.string().min(1, "Nama depan harus diisi"),
    last_name: z.string().min(1, "Nama belakang harus diisi"),
    password: z.string().min(8, "Password minimal 8 karakter"),
    confirm_password: z.string().min(8, "Password minimal 8 karakter"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Password tidak cocok",
    path: ["confirm_password"],
  });

export const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(8, "Password minimal 8 karakter"),
});
