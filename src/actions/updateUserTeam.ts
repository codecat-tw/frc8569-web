"use server";

import db from "@/utils/firestore";
import { doc, updateDoc } from "firebase/firestore";

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
