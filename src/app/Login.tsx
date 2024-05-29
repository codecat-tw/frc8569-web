'use client';
import { signIn } from 'next-auth/react';

export default function Login() {
  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-8">FRC管理系統</h1>
        <button className="flex items-center m-auto justify-center px-8 py-4 bg-white rounded-lg shadow-md hover:bg-gray-100" onClick={() => signIn('google')}>
          <img
            src="/google-icon.png"
            alt="Google Icon"
            className="w-8 h-8 md:w-10 md:h-10 mr-4"
          />
          <span className="text-xl md:text-2xl font-medium">使用 Google 登入</span>
        </button>
      </div>
    </div>
  )
}
