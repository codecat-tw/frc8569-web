"use server";
import { doc, updateDoc } from "firebase/firestore";
import db from "@/utils/firestore";

export const updateUserTeam = async (id: string, teamName: string): Promise<void> => {
  if (!id || !teamName) {
    throw new Error("缺少必須的參數");
  }

  const docRef = doc(db, "users", id);
  await updateDoc(docRef, {
    team: teamName,
  });
  console.log("updateDoc");
};
