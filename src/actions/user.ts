"use server";

import { getSession } from "./auth";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import db from "@/utils/firestore";

export async function isNewUser(id: string) {
  const docRef = doc(db, "users", id);
  const existingDoc = await getDoc(docRef);
  if (existingDoc.exists()) {
    return false;
  }
  return true;
}

export async function createAccount(id:string, email: string, name: string, image: string) {
  const docRef = doc(db, "users", email);

  const userData = {
    id: id,
    email: email,
    name: name,
    image: image,
    lastLogin: new Date().toISOString(),
    createAt: new Date().toISOString(),
  };

  await setDoc(docRef, userData);
}

export const updateUserTeam = async (id: string, teamName: string) => {
  if (!id || !teamName) {
    throw new Error("缺少必須的參數");
  }

  const docRef = doc(db, "users", id);
  await updateDoc(docRef, {
    team: teamName,
  });

  return "刪除完成";
};

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
