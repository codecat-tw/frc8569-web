"use server";

"use server";

import clientPromise from "@/lib/mongodb";
import { getSession } from "@/actions/auth";
import { Activity } from "@/types/activity";
import { Form } from "@/types/form";
import { ObjectId } from "mongodb";

const adminEmails = [
  "yd960528@gmail.com",
  "110330@mail2.chshs.ntpc.edu.tw",
  "kkbike@mail2.chshs.ntpc.edu.tw",
];

export async function getActivityList() {
  const session = await getSession();

  if (
    !session?.user?.email?.endsWith("@mail2.chshs.ntpc.edu.tw") &&
    !adminEmails.includes(session.user.email)
  ) {
    throw new Error("權限不足");
  }

  const client = await clientPromise;
  const db = client.db();
  const activities = await db.collection("activity").find({}).toArray();

  return activities.map((activity) => {
    const { _id, ...rest } = activity;
    return {
      ...rest,
      id: _id.toString(),
      members:
        activity.members?.map(({ name }: { name: string }) => ({ name })) || [],
    };
  }) as Activity[];
}

export async function applyItem({ formValues }: { formValues: Form }) {
  const session = await getSession();
  const { date, name, start, end, area, teacher } = formValues;

  if (!date || !name || !start || !end || !area || !teacher) {
    throw new Error("所有字段為必填");
  }

  const client = await clientPromise;
  const db = client.db();
  const result = await db.collection("activity").insertOne({
    ...formValues,
    applyEmail: session.user.email,
    applyName: session.user.name,
    status: "尚未審核",
    remark: "(沒有評語)",
    createdAt: new Date(),
  });

  return result.insertedId.toString();
}

export async function approveActivity(id: string) {
  if (!id) {
    throw new Error("活動ID缺失");
  }

  const client = await clientPromise;
  const db = client.db();
  await db
    .collection("activity")
    .updateOne({ _id: new ObjectId(id) }, { $set: { status: "申請通過" } });

  return "活動已批准";
}

export async function deleteActivity(id: string) {
  if (!id) {
    throw new Error("活動ID缺失");
  }

  const client = await clientPromise;
  const db = client.db();
  await db.collection("activity").deleteOne({ _id: new ObjectId(id) });

  return "活動已刪除";
}

interface Member {
  name: string;
  email: string;
  createdAt: string;
}

export async function joinEvent(id: string) {
  const session = await getSession();

  const client = await clientPromise;
  const db = client.db();
  const activity = await db
    .collection("activity")
    .findOne({ _id: new ObjectId(id) });

  if (!activity) {
    return "找不到活動";
  }

  const members = activity.members || [];

  const isAlreadyJoined = members.some(
    (member: Member) => member.email === session.user.email,
  );
  if (isAlreadyJoined) {
    return "你已報名過了";
  }

  const newMember: Member = {
    name: session.user.name,
    email: session.user.email,
    createdAt: new Date().toISOString(),
  };

  await db
    .collection("activity")
    .updateOne(
      { _id: new ObjectId(id) },
      { $push: { members: newMember as any } },
    );

  return "你已成功報名";
}

export async function updateRemark(id: string, remark: string) {
  if (!id || !remark) {
    throw new Error("缺少必要的參數");
  }

  const client = await clientPromise;
  const db = client.db();
  await db
    .collection("activity")
    .updateOne({ _id: new ObjectId(id) }, { $set: { remark: remark } });

  return "評語已更新";
}
