"use server";
import db from "@/utils/firestore";
import { doc, updateDoc } from "firebase/firestore";

export const approveActivity = async (id: string) => {
  if (!id) {
    throw new Error("活動ID缺失");
  }

  try {
    const docRef = doc(db, "activity", id);
    await updateDoc(docRef, {
      status: "申請通過",
    });
    return { success: true, message: "活動已批准" };
  } catch (error) {
    console.error("檔案更新錯誤: ", error);
    throw new Error("活動批准失敗");
  }
};
