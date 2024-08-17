import Link from 'next/link';
import Image from 'next/image'

export default function About() {
  return (
    <div className="container mx-auto flex flex-col">
      <div className="flex flex-col md:flex-row items-center bg-blue-100 p-8">
        <div className="md:w-1/2 flex justify-center items-center">
          <Image
            className="w-auto cursor-pointer"
            src="/FRC.jpg"
            alt="FRC Icon"
            width={256}
            height={256}
          />
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0 md:ml-4">
          <h2 className="mb-4 text-3xl font-bold text-gray-800">客服支援</h2>
          <p className="mb-6 text-gray-600">
            遇到問題或是想提供建議嗎？此網站由楊光地與程式貓團隊協同開發，歡迎隨時聯繫。
          </p>
          <button className="py-2 px-4 text-white font-semibold bg-blue-500 rounded hover:bg-blue-600 transition duration-300">
            開始使用
          </button>
        </div>
      </div>
    </div>
  )
}