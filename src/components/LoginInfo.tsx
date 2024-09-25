"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import db from "../utils/firestore";
import { doc, getDoc, setDoc } from "firebase/firestore";

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
        const docSnap = await getDoc(docRef);
        let userData = {};

        if (docSnap.exists()) {
          userData = docSnap.data();
        }

        const mergedData = {
          ...userData,
          email: userEmail,
          name: session.user?.name,
          image: session.user?.image,
          lastLogin: new Date().toISOString(),
        };

        await setDoc(docRef, mergedData, { merge: true });
        console.log("使用者資料更新成功");
      } catch (e) {
        console.error("更新使用者資料失敗:", e);
      }
    };

    if (session) {
      updateSessionData();
    }
  }, [session]);

  return null;
}
