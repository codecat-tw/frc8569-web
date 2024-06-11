import Link from 'next/link';

export default function Home() {
  return (
    <div className="text-black flex items-center justify-center min-h-screen bg-blue-100">
      <div className="text-center p-4">
        <h1 className="text-3xl font-bold mb-4">歡迎來到FRC管理系統</h1>
        <p className="text-lg mb-4">整合申請、報名、管理、統計於一體網站</p>
        <p className="text-lg mb-4">支援連結自動報名、多功能管理</p>
        <p className="text-lg mb-4">遇到問題請聯繫開發者楊光地</p>
        <p className="text-lg mb-4">郵件請洽: 110330@mail2.chshs.ntpc.edu.tw</p>
        <div className="flex flex-col space-y-4">
          <Link href="/list" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
            報名活動
          </Link>
          <Link href="https://www.instagram.com/guangdiy/" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
            社群支援
          </Link>
        </div>
      </div>
    </div>
  )
}
