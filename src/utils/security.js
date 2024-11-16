import crypto from "crypto";

export const generateNonce = () => {
  return crypto.randomBytes(32).toString("hex");
};

export const sanitizeInput = (input) => {
  if (typeof input !== "string") return input;
  return input
    .replace(/[<>]/g, "") // Remove < and >
    .trim()
    .slice(0, 100); // Limit length
};
