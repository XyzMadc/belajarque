import kontenbase from "@/lib/kontenbase";
import { hashPassword } from "./authFunctions";

export async function registerUser(email, password) {
  const hashedPassword = await hashPassword(password);
  return await kontenbase.auth.register({ email, password: hashedPassword });
}

export async function loginUser(email, password) {
  return await kontenbase.auth.login({ email, password });
}
