"use client"
import React from 'react';
import { signOut } from 'next-auth/react';
import SearchUser from '../../../components/firebase/SearchUser';

const UserPage = () => {
  const { user, loading } = SearchUser();

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center text-xl">載入中...</div>;
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
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{user.name}</h1>
        <p className="text-gray-600 text-lg">
          註冊帳號: {user.email} <br /> 組別: {user.team} <br /> 最後登入: {user.lastLogin}
        </p>
        
        <button
          onClick={() => signOut()}
          className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          登出
        </button>
      </div>
    </div>
  );
};

export default UserPage;
