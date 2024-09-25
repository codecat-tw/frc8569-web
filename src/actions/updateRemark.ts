"use server";
import db from "@/utils/firestore";
import { doc, updateDoc } from "firebase/firestore";

export const updateRemark = async (id: string, remark: string) => {
  if (!id || !remark) {
    throw new Error("缺少必要的參數");
  }

  try {
    const docRef = doc(db, "activity", id);
    await updateDoc(docRef, {
      status: "申請通過",
      remark: remark,
    });
    return { success: true, message: "評語已更新" };
  } catch (error) {
    console.error("檔案更新錯誤: ", error);
    throw new Error("評語更新失敗");
  }
};
