import { createAccount, isNewUser, updateLastLogin } from "@/actions/user";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      console.log("signIn", user.email);
      const q = await isNewUser(user.email || "");
      console.log("isNewUser", q);

      if (q) {
        await createAccount(
          user.id,
          user.email || "",
          user.name || "",
          user.image || "",
        );
      }

      await updateLastLogin(user.email || "");

      return true;
    },
  },
};
