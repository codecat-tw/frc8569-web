"use client";
import { useParams } from "next/navigation";
import { signOut } from "next-auth/react";

const UserPage = () => {
  const params = useParams();

  if (!params || !params.id || Array.isArray(params.id)) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Invalid user ID
      </div>
    );
  }

  const { id } = params;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded bg-white p-8 shadow-md">
        <h1 className="mb-4 text-2xl font-bold">User Profile: {id}</h1>
        <p className="text-gray-700">
          This is the user profile page for user {id}.
        </p>
        <button
          onClick={() => signOut()}
          className="text-sm font-semibold text-gray-900 hover:text-gray-700"
        >
          登出
        </button>
      </div>
    </div>
  );
};

export default UserPage;
