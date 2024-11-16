// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import kontenbase from "@/lib/kontenbase";

// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         try {
//           const { user, error } = await kontenbase.auth.login({
//             email: credentials.email,
//             password: credentials.password,
//           });

//           if (error || !user) {
//             console.error("Login failed:", error?.message);
//             return null;
//           }

//           return {
//             id: user._id,
//             name: user.name,
//             email: user.email,
//           };
//         } catch (error) {
//           return null;
//         }
//       },
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.token = user.token; // Save Kontenbase token in JWT
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.user.id = token.id;
//         session.user.token = token.token; // Make token available in session
//       }
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/auth/login",
//   },
// });

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import kontenbase from "@/lib/kontenbase";
import { authLimiter } from "@/utils/rateLimit";
import { generateNonce, sanitizeInput } from "@/utils/security";
import { validateEmail } from "@/utils/validation";

const COMPROMISED_PASSWORDS = new Set(["Password123!", "Admin123!"]);

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await authLimiter(req, res);

          const email = sanitizeInput(credentials.email);
          const password = credentials.password;

          const emailValidation = validateEmail(email);
          if (!emailValidation.isValid) {
            throw new Error(emailValidation.error);
          }

          if (COMPROMISED_PASSWORDS.has(password)) {
            throw new Error(
              "This password has been compromised. Please choose a different one."
            );
          }

          const { user, error } = await kontenbase.auth.login({
            email,
            password,
          });

          if (error || !user) {
            console.error("Login failed:", error?.message);
            throw new Error("Invalid credentials");
          }

          const sessionToken = crypto.randomUUID().toString("hex");

          return {
            id: user._id,
            name: user.firstName
              ? `${user.firstName} ${user.lastName}`.trim()
              : user.userName,
            email: user.email,
            token: sessionToken,
          };
        } catch (error) {
          console.error("Auth error:", error);
          throw error;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 2 * 60 * 60,
    updateAge: 30 * 60,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    encryption: true,
    maxAge: 2 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.token = user.token;
        token.nonce = generateNonce();
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.token = token.token;
        session.nonce = token.nonce;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
};

export default NextAuth(authOptions);
