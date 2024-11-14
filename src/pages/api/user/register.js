import { hashPassword } from "../../../lib/auth";
import kontenbase from "../../../lib/kontenbase";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { name, email, password } = req.body;

    // Cek email sudah terdaftar
    const existingUser = await kontenbase.get(`/users?email=${email}`);
    if (existingUser.data.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Buat user baru
    const newUser = await kontenbase.post("/users", {
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: newUser.data,
    });
  } catch (error) {
    return res.status(500).json({ message: "Registration failed" });
  }
}
