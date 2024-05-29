'use client';
import { signIn } from 'next-auth/react';

export default function Home() {
  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">FRC管理系統</h1>
        <button className="flex items-center px-6 py-3 bg-white rounded-lg shadow-md hover:bg-gray-100" onClick={() => signIn('google')}>
          <img
            src="/google-icon.png"
            alt="Google Icon"
            className="w-6 h-6 mr-3"
          />
          <span className="text-lg font-medium">使用 Google 登入</span>
        </button>
      </div>
    </div>
  )
}
