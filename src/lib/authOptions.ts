import { FirestoreAdapter } from "@auth/firebase-adapter";
import { updateLastLogin } from "@/actions/user";
import { NextAuthOptions } from "next-auth";
import { cert } from "firebase-admin/app";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: process.env.AUTH_FIREBASE_PROJECT_ID,
      clientEmail: process.env.AUTH_FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.AUTH_FIREBASE_PRIVATE_KEY!.replaceAll(
        "\\n",
        "\n",
      ),
    }),
  }) as Adapter,
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      console.log("session:", session);
      return session;
    },
    async signIn({ user, account }) {
      console.log("signIn", account);
      //await updateLastLogin(account?.userId as string);

      return true;
    },
  },
};
