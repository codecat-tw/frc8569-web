"use client";

import { useParams } from "next/navigation";
import LoadUser from "@/components/user/LoadUser";
import Image from "next/image";

export default function UserPage() {
  const params = useParams();

  if (!params || !params.id || Array.isArray(params.id)) {
    return;
  }

  const userId = decodeURIComponent(params.id);
  const { user, loading } = LoadUser({ userId });

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-xl">
        載入中...
      </div>
    );
  }

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
            src={user.image || "/default-avatar.png"}
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
          組別: {user.team}
        </div>
      </div>
    </div>
  );
}
