import kontenbase from "@/lib/kontenbase";
import { registerSchema } from "@/utils/validation";
import { setCookie } from "nookies";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: result.error.errors[0].message,
      });
    }

    const { firstName, lastName, userName, email, password } = result.data;

    const { error, token } = await kontenbase.auth.register({
      firstName,
      lastName,
      userName,
      email,
      password,
    });

    if (error) {
      return res.status(401).json({ error: error.message });
    }

    setCookie({ res }, "token", token, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return res.status(200).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
