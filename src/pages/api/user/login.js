import { comparePassword, generateToken } from "../../../lib/auth";
import kontenbase from "../../../lib/kontenbase";
import cookie from "cookie";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;

  try {
    const userResponse = await kontenbase.get(`/users?email=${email}`);
    const user = userResponse.data[0];

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user);

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60, // 1 day
        path: "/",
      })
    );

    return res.status(200).json({
      message: "Login successful",
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    return res.status(500).json({ message: "Login failed" });
  }
}
