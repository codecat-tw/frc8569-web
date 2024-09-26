"use server";
import db from "@/utils/firestore";
import { doc, updateDoc } from "firebase/firestore";

export const approveActivity = async (id: string) => {
  if (!id) {
    throw new Error("活動ID缺失");
  }

  const docRef = doc(db, "activity", id);
  await updateDoc(docRef, {
    status: "申請通過",
  });
  
  return "活動已批准";
};
