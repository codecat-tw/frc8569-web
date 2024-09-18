"use client";
import React from "react";
import { signOut } from "next-auth/react";
import SearchUser from "@/components/firebase/SearchUser";

export default function UserPage() {
  const { user, loading } = SearchUser();

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
          <img
            src={user.image}
            alt={user.name}
            className="h-24 w-24 rounded-full shadow-md"
          />
        </div>

        <h1 className="mb-2 text-center text-3xl font-bold text-gray-800">
          {user.name}
        </h1>

        <p className="mb-4 text-center text-lg text-gray-600">
          註冊帳號: {user.email} <br /> 組別: {user.team} <br /> 最後登入:{" "}
          {user.lastLogin}
        </p>

        <button
          onClick={() => signOut()}
          className="mt-4 w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          登出
        </button>
      </div>
    </div>
  );
};
