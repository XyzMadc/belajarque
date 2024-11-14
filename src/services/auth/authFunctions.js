import bcrypt from "bcryptjs";

export async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(inputPassword, hashedPassword) {
  return await bcrypt.compare(inputPassword, hashedPassword);
}
