"use server";

import { db } from "@/lib/mongodb";
import { User } from "@/types/user";
import { getSession } from "@/actions/auth";
import { ObjectId } from "mongodb";

export async function getUserData(id: string) {
  if (!id) throw new Error("缺少必須的參數");

  const user = await db.collection("user").findOne({ _id: new ObjectId(id) });

  if (!user) throw new Error(`使用者資料不存在，ID: ${id}`);

  const { _id, ...rest } = user;

  return {
    ...rest,
    id: _id.toString(),
  } as unknown as User;
}

export async function setTeam(teamName: string) {
  if (!teamName) throw new Error("缺少必須的參數");

  const session = await getSession();

  await db
    .collection("user")
    .updateOne(
      { _id: new ObjectId(session.user.id) },
      { $set: { team: teamName } },
    );
}
