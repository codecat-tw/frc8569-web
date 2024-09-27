"use server";

import { getSession } from "./auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import db from "@/utils/firestore";

export const loginLog = async () => {
  const session = await getSession();

  if (!session || !session.user?.email) {
    throw new Error("使用者未登入");
  }

  const docRef = doc(db, "users", session.user.email);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const existingData = docSnap.data();
    const mergedData = {
      ...existingData,
      lastLogin: new Date().toISOString(),
    };
    await setDoc(docRef, mergedData, { merge: true });
  } else {
    return true;
  }

  return false;
};
