"use server";

import db from "@/utils/firestore";
import { collection, setDoc, doc } from "firebase/firestore";
import { getSession } from "./auth";

interface FormValues {
  date: string;
  name: string;
  start: string;
  end: string;
  area: string;
  teacher: string;
}

export const applyItem = async ({
  formValues,
}: {
  formValues: FormValues;
}): Promise<string> => {
  const session = await getSession();
  const { date, name, start, end, area, teacher } = formValues;

  if (!session || !session?.user?.email || !session?.user?.name) {
    throw new Error("session載入失敗");
  }

  if (!date || !name || !start || !end || !area || !teacher) {
    throw new Error("所有字段為必填");
  }

  const applyTime = new Date().toISOString();
  const docRef = doc(collection(db, "activity"), applyTime);
  await setDoc(docRef, {
    ...formValues,
    applyEmail: session.user.email,
    applyName: session.user.name,
    status: "尚未審核",
    remark: "(沒有評語)",
  });

  return applyTime;
};
