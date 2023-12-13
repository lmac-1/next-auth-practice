import nextAuth from "next-auth";
import prisma from "@/libs/prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECREt,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "JS Smith" },
        password: { label: "Password", type: "password" },
        username: {
          label: "Username",
          type: "text",
          placeholder: "John Smith",
        },
      },
      // we have to hard code a user
      async authorize(credentials) {
        // dummy data
        const user = { id: 1, name: "J Smith", email: "brett@email.com" };
        return user;
      },
    }),
  ],
  secret: process.env.SECRET,
  session: {
    // we will encode everything with jwt (JSON web tokens)
    strategy: "jwt",
  },
  // enables debug mode in development
  debug: process.env.NODE_ENV === "development",
};

const handler = nextAuth(authOptions);

export { handler as GET, handler as POST };
