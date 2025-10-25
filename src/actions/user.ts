"use server";

import db from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { User } from "@/types/user";
import { getSession } from "@/actions/auth";

export async function getUserData(id: string) {
  if (!id) {
    throw new Error("缺少必須的參數");
  }

  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error("使用者資料不存在");
  }

  return docSnap.data() as User;
}

export async function setTeam(teamName: string) {
  if (!teamName) {
    throw new Error("缺少必須的參數");
  }

  const session = await getSession();
  const docRef = doc(db, "users", session.user.id);
  await updateDoc(docRef, { team: teamName });
}
