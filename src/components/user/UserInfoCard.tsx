"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { getUserData } from "@/actions/user";
import { User } from "@/types/user";
import SetUserTeam from "@/components/user/SetTeam";
import Image from "next/image";

export default function UserInfoCard() {
  const [user, setUser] = useState<User>();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user?.id) return;
    getUserData(session.user.id).then(setUser);
  }, [session]);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-600">載入使用者資料中...</p>
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
          最後登入: {user.loginAt}
          <br />
          <SetUserTeam team={user.team || ""} />
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
