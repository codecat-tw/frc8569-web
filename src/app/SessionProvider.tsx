"use client";
import { useEffect } from "react";
import { Session } from "next-auth";
import { SessionProvider as Provider } from "next-auth/react";
import db from "../utils/firestore";
import { doc, setDoc } from "firebase/firestore";

type Props = {
  children: React.ReactNode;
  session: Session | null;
};

export default function SessionProvider({ children, session }: Props) {
  useEffect(() => {
    const updateSessionData = async () => {
      const userEmail = session?.user?.email || "ErrorUser";
      const sessionRef = doc(db, "users", userEmail);
      try {
        await setDoc(
          sessionRef,
          {
            lastLogin: new Date().toISOString(),
          },
          { merge: true },
        );
        console.log("Session sent successful.");
      } catch (e) {
        console.error("Session sent error. ", e);
      }
    };

    updateSessionData();
  }, [session]);

  return <Provider session={session}>{children}</Provider>;
}
