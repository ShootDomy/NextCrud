import "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { loginUser } from "@/actions/user.acction";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    nombre: string;
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await loginUser(credentials.email);
        if (!user || !user.password) return null;
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) return null;
        return {
          id: user.id,
          email: user.email,
          nombre: user.nombre,
          name: user.nombre,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login", error: "/login" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.nombre = user.nombre;
        token.email = user.email ?? "";
      }
      return token;
    },
    async session({ session, token }) {
      session.user = session.user || {};
      if (token) {
        session.user.id = token.id as string;
        session.user.nombre = token.nombre as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
