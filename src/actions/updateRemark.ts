"use server";

import db from "@/utils/firestore";
import { doc, updateDoc } from "firebase/firestore";

export const updateRemark = async (id: string, remark: string) => {
  if (!id || !remark) {
    throw new Error("缺少必要的參數");
  }

  const docRef = doc(db, "activity", id);
  await updateDoc(docRef, {
    remark: remark,
  });

  return "評語已更新";
};
