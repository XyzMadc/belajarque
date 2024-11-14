import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/login",
    signUp: "/auth/register",
  },
});

export const config = {
  matcher: ["/", "/profile/:path*"],
};
