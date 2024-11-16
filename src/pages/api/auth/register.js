// import kontenbase from "@/lib/kontenbase";

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   try {
//     const {
//       userName,
//       email,
//       password,
//       firstName = "",
//       lastName = "",
//     } = req.body;

//     if (!userName || !email || !password) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     const { user, error } = await kontenbase.auth.register({
//       userName,
//       email,
//       password,
//       firstName,
//       lastName,
//     });

//     if (error) {
//       return res.status(400).json({ error: error.message });
//     }

//     res.status(201).json({
//       message: "User created successfully",
//       user: {
//         id: user._id,
//         userName: user.userName,
//         email: user.email,
//       },
//     });
//   } catch (error) {
//     console.error("Registration error:", error);
//     res.status(500).json({ error: "An error occurred during registration" });
//   }
// }

import kontenbase from "@/lib/kontenbase";
import { authLimiter } from "@/utils/rateLimit";
import { sanitizeInput } from "@/utils/security";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "@/utils/validation";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await authLimiter(req, res);

    const {
      userName,
      email,
      password,
      firstName = "",
      lastName = "",
    } = req.body;

    const sanitizedInputs = {
      userName: sanitizeInput(userName),
      email: sanitizeInput(email),
      password,
      firstName: sanitizeInput(firstName),
      lastName: sanitizeInput(lastName),
    };

    const validations = [
      validateUsername(sanitizedInputs.userName),
      validateEmail(sanitizedInputs.email),
      validatePassword(sanitizedInputs.password),
    ];

    const invalidValidation = validations.find((v) => !v.isValid);
    if (invalidValidation) {
      return res.status(400).json({ error: invalidValidation.error });
    }

    // if (COMPROMISED_PASSWORDS.has(sanitizedInputs.password)) {
    //   return res.status(400).json({
    //     error:
    //       "This password has been compromised. Please choose a different one.",
    //   });
    // }

    const { user, error } = await kontenbase.auth.register({
      userName: sanitizedInputs.userName,
      email: sanitizedInputs.email,
      password: sanitizedInputs.password,
      firstName: sanitizedInputs.firstName,
      lastName: sanitizedInputs.lastName,
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "An error occurred during registration" });
  }
}
