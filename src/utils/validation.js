import * as z from "zod";

// Skema validasi login
export const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z
    .string()
    .min(6, "Password minimal 6 karakter")
    .max(50, "Password maksimal 50 karakter"),
});

// Skema validasi register
export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "Nama minimal 2 karakter")
      .max(50, "Nama maksimal 50 karakter"),
    email: z.string().email("Email tidak valid"),
    password: z
      .string()
      .min(6, "Password minimal 6 karakter")
      .max(50, "Password maksimal 50 karakter")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        "Password harus mengandung huruf besar, huruf kecil, angka, dan karakter spesial"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Konfirmasi password tidak cocok",
    path: ["confirmPassword"],
  });
