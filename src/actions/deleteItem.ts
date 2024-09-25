"use server";
import db from "@/utils/firestore";
import { doc, deleteDoc } from "firebase/firestore";

export const deleteActivity = async (id: string): Promise<void> => {
  if (!id) {
    throw new Error("缺少活動ID");
  }

  const itemRef = doc(db, "activity", id);
  try {
    await deleteDoc(itemRef);
    console.log("deleteDoc");
  } catch (error) {
    console.error("刪除文件時出錯：", error);
    throw new Error("刪除活動失敗");
  }
};
