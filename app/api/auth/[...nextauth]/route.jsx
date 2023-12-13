import nextAuth from "next-auth";
import prisma from "@/libs/prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
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
      // This is where we check if the user is logging in with correct email and password (Credentials method only)
      async authorize(credentials) {
        /* 
        // We create dummy data when we first create the application which checks next auth is properly working
        const user = { id: 1, name: "J Smith", email: "brett@email.com" };
        return user; */

        // Check to see if email and password is there
        if (!credentials.email || !credentials.password) {
          throw new Error("Please enter an email and password");
        }

        // Check to see if the user exists
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // if no user found OR the user doesn't have a hashed password
        // hashedPassword is an optional field because users who log in with GitHub or Google won't set a password
        if (!user || !user?.hashedPassword) {
          throw new Error("No user found");
        }

        // Check to see if password matches
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        // if password doesn't match
        if (!passwordMatch) {
          throw new Error("Incorrect password");
        }
        // If a user gets to here, they have valid credentials and can log into their account
        return user;
      },
    }),
  ],
  callbacks: {
    // The jwt function only returns the user when you first log in
    async jwt({ token, user, session, trigger }) {
      console.log("jwt callback", { token, user, session });

      // If we try to update the session with a new name, update the name in the session
      if (trigger === "update" && session?.name) {
        token.name = session.name;

        // update user's name in the database
        await prisma.user.update({
          where: { id: token.id },
          data: {
            name: token.name,
          },
        });
      }

      // on login, we can pass user id and address into our token so we can access it in the session
      if (user) {
        return { ...token, id: user.id, address: user.address };
      }

      return token;
    },
    async session({ session, token, user }) {
      console.log("session callback", { session, token, user });
      // pass user id and address to session (from the token)
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          address: token.address,
          // we had to add this so it would correctly get updated from the token when update() method is called
          name: token.name,
        },
      };
    },
  },
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
