import Link from 'next/link';
import Image from 'next/image'

export default function About() {
  return (
    <div className="flex flex-col container mx-auto ">
      <div className="bg-blue-100 p-8 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2">
        <Image
          className="h-8 w-auto cursor-pointer"
          src="/FRC.jpg"
          alt="FRC Icon"
          width={64}
          height={64}
        />
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0 md:ml-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">主標題</h2>
          <p className="text-gray-600 mb-6">這是一段描述文字，可以根據你的需求進行修改。確保這段文字能夠吸引訪客的注意，並傳達重要訊息。</p>
          <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300">按鈕文字</button>
        </div>
      </div>
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