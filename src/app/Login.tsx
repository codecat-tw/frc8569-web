'use client';
import { signIn } from 'next-auth/react';

export default function Login() {
  return (
    <div className="text-black min-h-screen bg-blue-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">FRC管理系統</h1>
        <button className="flex items-center m-auto justify-center px-8 py-4 mb-8 bg-white rounded-lg shadow-md hover:bg-gray-100" onClick={() => signIn('google')}>
          <img
            src="/google-icon.png"
            alt="Google Icon"
            className="w-8 h-8 mr-4"
          />
          <span className="text-xl md:text-2xl font-medium">使用 Google 登入</span>
        </button>
        <h1 className="text-red-800 text-xl font-bold">系統尚不支援Line與IG等崁入式瀏覽器</h1>
        <h1 className="text-red-800 text-xl font-bold">請使用chrome或safari等系統瀏覽器</h1>
      </div>
    </div>
  )
}
