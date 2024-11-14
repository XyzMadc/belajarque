import kontenbase from "@/lib/kontenbase";
import { registerUser } from "./authServices";
import { verifyPassword } from "./authFunctions";

export async function handleRegister(email, password) {
  try {
    const { user, error } = await registerUser(email, password);
    if (error) throw new Error(error.message);
    return { user };
  } catch (error) {
    console.error("Error registrasi:", error);
    return { error };
  }
}

export async function handleLogin(email, password) {
  try {
    const { user, error } = await kontenbase.auth.findUser({ email });
    if (error || !user) throw new Error("Email atau password salah");

    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) throw new Error("Email atau password salah");

    return { user };
  } catch (error) {
    console.error("Error login:", error);
    return { error };
  }
}
