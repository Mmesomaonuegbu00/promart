import { withAuth } from "next-auth/middleware";
import { isProtectedRoute } from "../utils/protectedRoutes";

export default withAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ req, token }) {
      const pathname = req.nextUrl.pathname;

      console.log("Middleware triggered for:", pathname);
      console.log("Token:", token);

      if (isProtectedRoute(pathname)) {
        return !!token;
      }

      return true; // Allow public routes
    },
  },
});

export const config = {
  matcher: [
    "/((?!_next|favicon.ico|.*\\.(?:svg|ico|jpg|png|css|js|ts|map)).*)",
  ],
};
