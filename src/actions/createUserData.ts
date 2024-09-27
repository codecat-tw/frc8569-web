"use server";

import { getSession } from "./auth";
import { doc, setDoc, getDoc, query, where, getDocs, collection } from "firebase/firestore";
import db from "@/utils/firestore";

export async function createUserData(id: string, team: string) {
  const session = await getSession();

  if (!id || !team) {
    throw new Error("表單資料缺失");
  }

  if (!session || !session.user?.email || !session.user?.name) {
    throw new Error("session載入失敗");
  }

  const docRef = doc(db, "users", session.user.email);

  const existingDoc = await getDoc(docRef);
  if (existingDoc.exists()) {
    throw new Error(`使用者 "${session.user.email}" 已存在，無法重新創建`);
  }

  const usersRef = collection(db, "users");
  const q = query(usersRef, where("id", "==", id));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    throw new Error(`使用者 ID "${id}" 已被使用`);
  }

  const userData = {
    email: session.user.email,
    name: session.user.name,
    image: session.user.image,
    lastLogin: new Date().toISOString(),
    id,
    team,
  };

  await setDoc(docRef, userData);
}
