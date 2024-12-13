import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";
import bcrypt from "bcrypt";
import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }
  interface User {
    id: string;
    username: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
  }
}

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          username: profile.email.split('@')[0],
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        }
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      profile(profile) {
        return {
          id: profile.id.toString(),
          username: profile.login,
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
        }
      },
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          console.log("Login attempt for username:", credentials?.username);

          if (!credentials?.username || !credentials?.password) {
            console.log("Missing credentials");
            return null;
          }

          const [user] = await db
            .select()
            .from(users)
            .where(eq(users.username, credentials.username));

          console.log("Found user:", user ? "Yes" : "No");
          
          if (!user) {
            console.log("User not found");
            return null;
          }

          const passwordMatch = await bcrypt.compare(credentials.password, user.password);
          console.log("Password match:", passwordMatch ? "Yes" : "No");

          if (!passwordMatch) {
            console.log("Password doesn't match");
            return null;
          }

          const userToReturn = {
            id: user.id.toString(),
            username: user.username,
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            image: null
          };

          console.log("Login successful, returning user:", userToReturn);
          return userToReturn;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "github" || account?.provider === "google") {
        try {
          // Check if user exists
          const [existingUser] = await db
            .select()
            .from(users)
            .where(eq(users.email, user.email!));

          if (!existingUser) {
            // Create new user
            await db.insert(users).values({
              username: user.username!,
              email: user.email,
              firstName: user.name?.split(" ")[0] || "",
              lastName: user.name?.split(" ")[1] || "",
              password: "", // Empty password for OAuth users
              image: user.image
            });
          }
        } catch (error) {
          console.error("Error handling OAuth sign in:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.username = token.username;
      }
      return session;
    }
  },
  pages: {
    signIn: "/ClientSide/login",
    error: "/ClientSide/login",
    signOut: "/"
  },
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 