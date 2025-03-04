"use server";

import db from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { User } from "@/types/user";

export async function updateLastLogin(id: string) {
  if (!id) {
    throw new Error("缺少必須的參數");
  }
  const docRef = doc(db, "users", id);
  await updateDoc(docRef, {
    lastLogin: new Date().toISOString(),
  });
}

export async function getUserData(id: string) {
  if (!id) {
    throw new Error("缺少必須的參數");
  }

  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as User;
  } else {
    throw new Error("使用者資料不存在");
  }
}

export async function setTeam(id: string, teamName: string) {
  if (!id || !teamName) {
    throw new Error("缺少必須的參數");
  }
  const docRef = doc(db, "users", id);
  await updateDoc(docRef, {
    team: teamName,
  });
}
