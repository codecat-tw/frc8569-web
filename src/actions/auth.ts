"use server";

import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

export async function getSession() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    throw new Error("用戶資料遺失。session 載入失敗或 user 未定義");
  }

  const { email, name } = session.user;

  if (!email || !name) {
    throw new Error(
      "用戶資料遺失。session 的 user 缺少必要的屬性 email 或 name",
    );
  }

  return session as {
    user: {
      id: string;
      email: string;
      name: string;
      image?: string | null;
    };
  };
}
