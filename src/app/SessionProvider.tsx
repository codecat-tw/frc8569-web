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
      const userEmail = session?.user?.email;

      if (!userEmail) {
        console.error("使用者未登入");
        return;
      }

      const docRef = doc(db, "users", userEmail);
      try {
        await setDoc(
          docRef,
          {
            email: userEmail,
            name: session.user?.name,
            image: session.user?.image,
            lastLogin: new Date().toISOString(),
          },
          { merge: true },
        );
        console.log("登入記錄傳送成功");
      } catch (e) {
        console.error("登入紀錄傳送失敗:", e);
      }
    };

    updateSessionData();
  }, [session]);

  return <Provider session={session}>{children}</Provider>;
}
