import { handleLogin } from "@/services/auth/authHandlers";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { user, error } = await handleLogin(
          credentials.email,
          credentials.password
        );

        if (error) {
          throw new Error(error.message);
        }

        if (user) {
          return { id: user._id, email: user.email };
        }

        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
});
