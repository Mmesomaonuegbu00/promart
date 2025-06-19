import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "your-name" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // 🔐 Dummy login — replace with real user validation if needed
        if (credentials?.username && credentials?.password) {
          return {
            id: Date.now().toString(),
            name: credentials.username,
            email: `${credentials.username.toLowerCase()}@example.com`, // ✅ Add dummy email
            image: "/p1.png", // Optional default image
          };
        }
        return null;
      },
    }),
  ],

  pages: {
    signIn: "/login", // Your custom login page
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user, account, profile }) {
      // ✅ Store email and picture in token
      if (user?.email) {
        token.email = user.email;
      }
       if (user) {
      // Save user's image and email on first login (Credentials or Google)
      token.picture = user.image ?? profile?.picture ?? "/default.png";
      token.email = user.email ?? token.email;
    }

      if (account?.provider === "google" && profile) {
        token.picture = profile.picture;
      }

      if (user?.image) {
        token.picture = user.image;
      }

      return token;
    },

    async session({ session, token }) {
      // ✅ Add email and image to session
      if (token?.email) {
        session.user.email = token.email;
      }

      if (token?.picture) {
        session.user.image = token.picture;
      }

      return session;
    },
  },
});

export { handler as GET, handler as POST };
