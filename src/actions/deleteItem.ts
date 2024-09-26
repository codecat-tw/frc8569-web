"use server";
import db from "@/utils/firestore";
import { doc, deleteDoc } from "firebase/firestore";

export const deleteActivity = async (id: string): Promise<void> => {
  if (!id) {
    throw new Error("缺少活動ID");
  }

  const itemRef = doc(db, "activity", id);
  await deleteDoc(itemRef);
};
