"use server";

import db from "@/lib/firebase";
import { getSession } from "@/actions/auth";
import { Activity } from "@/types/activity";
import { Form } from "@/types/form";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";

const adminEmails = [
  "yd960528@gmail.com",
  "110330@mail2.chshs.ntpc.edu.tw",
  "kkbike@mail2.chshs.ntpc.edu.tw",
];

export async function getActivityList() {
  const session = await getSession();

  if (
    session?.user?.email?.endsWith("@mail2.chshs.ntpc.edu.tw") ||
    adminEmails.includes(session.user.email)
  ) {
  } else {
    throw new Error("權限不足");
  }

  const querySnapshot = await getDocs(collection(db, "activity"));
  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
    members:
      doc.data().members?.map(({ name }: { name: string }) => ({ name })) || [],
  })) as Activity[];
}

export async function applyItem({ formValues }: { formValues: Form }) {
  const session = await getSession();
  const { date, name, start, end, area, teacher } = formValues;

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
}

export async function approveActivity(id: string) {
  if (!id) {
    throw new Error("活動ID缺失");
  }

  const docRef = doc(db, "activity", id);
  await updateDoc(docRef, {
    status: "申請通過",
  });

  return "活動已批准";
}

export async function deleteActivity(id: string) {
  if (!id) {
    throw new Error("活動ID缺失");
  }

  const docRef = doc(db, "activity", id);
  await deleteDoc(docRef);

  return "活動已刪除";
}

interface Member {
  name: string;
  email: string;
  createdAt: string;
}

interface ActivityData {
  members: Member[];
}

export async function joinEvent(id: string) {
  const session = await getSession();

  const docRef = doc(db, "activity", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return "找不到活動";
  }

  const activityData = docSnap.data() as ActivityData;
  const members = activityData.members || [];

  const isAlreadyJoined = members.some(
    (member) => member.email === session.user.email,
  );
  if (isAlreadyJoined) {
    return "你已報名過了";
  }

  const newMember: Member = {
    name: session.user.name,
    email: session.user.email,
    createdAt: new Date().toISOString(),
  };

  members.push(newMember);

  await setDoc(docRef, { members }, { merge: true });

  return "你已成功報名";
}

export async function updateRemark(id: string, remark: string) {
  if (!id || !remark) {
    throw new Error("缺少必要的參數");
  }

  const docRef = doc(db, "activity", id);
  await updateDoc(docRef, {
    remark: remark,
  });

  return "評語已更新";
}
