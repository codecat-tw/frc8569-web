"use client";

import { signIn } from "next-auth/react";

export default function Unauth() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="p-4 text-center">
        <h1 className="mb-4 text-3xl font-bold">未登入</h1>
        <p className="mb-4">請登入以繼續</p>
        <button
          onClick={() => signIn("google")}
          className="rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
        >
          登入
        </button>
      </div>
    </div>
  );
}
