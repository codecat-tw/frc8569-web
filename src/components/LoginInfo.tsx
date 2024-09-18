"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import db from "../utils/firestore";
import { doc, setDoc } from "firebase/firestore";

export default function SessionUpdater() {
  const { data: session } = useSession();

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
          { merge: true }
        );
        console.log("登入記錄傳送成功");
      } catch (e) {
        console.error("登入紀錄傳送失敗:", e);
      }
    };

    if (session) {
      updateSessionData();
    }
  }, [session]);

  return null;
}
