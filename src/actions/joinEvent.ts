"use server";

import db from "@/utils/firestore";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getSession } from "./auth";

interface Member {
  name: string;
  email: string;
  createdAt: string;
}

interface ActivityData {
  members: Member[];
}

export const joinEvent = async (id: string): Promise<string> => {
  const session = await getSession();

  if (!session || !session.user?.email || !session.user?.name) {
    return "session載入失敗";
  }

  const userEmail = session.user.email;
  const userName = session.user.name;

  const docRef = doc(db, "activity", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return "找不到活動";
  }

  const activityData = docSnap.data() as ActivityData;
  const members = activityData.members || [];

  const isAlreadyJoined = members.some((member) => member.email === userEmail);
  if (isAlreadyJoined) {
    return "你已報名過了";
  }

  const newMember: Member = {
    name: userName,
    email: userEmail,
    createdAt: new Date().toISOString(),
  };

  members.push(newMember);

  await setDoc(docRef, { members }, { merge: true });

  return "你已成功報名";
};
