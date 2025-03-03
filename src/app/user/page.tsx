"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { getUserData } from "@/actions/user";
import { User } from "@/types/user";
import SetUserTeam from "@/components/user/SetUserTeam";
import Image from "next/image";

export default function UserPage() {
  const [user, setUser] = useState<User | null>(null);
  const { data: session } = useSession();
  const userId = session?.user?.email || "ErrorUser";  // 用 session 來取得 email 作為 userId

  useEffect(() => {
    if (userId !== "ErrorUser") { // 當有有效的 userId 時才進行資料查詢
      getUserData(userId).then(setUser);
    }
  }, [userId]); // 依賴於 userId，當 session 更新時觸發

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center text-xl">
        查無使用者
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-lg bg-white p-8 shadow-lg">
        <div className="mb-4 flex justify-center">
          <Image
            src={user.image}
            alt={user.name}
            width={96}
            height={96}
            className="rounded-full shadow-md"
          />
        </div>

        <h1 className="mb-2 text-center text-3xl font-bold text-gray-800">
          {user.name}
        </h1>

        <div className="mb-4 text-center text-lg text-gray-800">
          註冊帳號: {user.email}
          <br />
          最後登入: {user.lastLogin}
          <br />
          <SetUserTeam id={user.email} team={user.team || ""} />
        </div>

        <button
          onClick={() => signOut()}
          className="mt-4 w-full rounded-sm bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          登出
        </button>
      </div>
    </div>
  );
}
