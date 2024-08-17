import Link from 'next/link';
import Image from 'next/image'

export default function About() {
  return (
    <div className="container mx-auto flex flex-col">
      <div className="flex flex-col md:flex-row items-center bg-blue-100 p-8">
        <div className="md:w-1/2 mt-8 md:mt-0 md:ml-4">
          <h2 className="mb-4 text-3xl font-bold text-gray-800">查詢活動</h2>
          <p className="mb-6 text-gray-600">
            系統採用Google公司提供的資料庫，讀寫速度是原系統的十倍以上。使用此系統可以有效節約時間，更快了解整個活動概況。
          </p>
          <button className="py-2 px-4 text-white font-semibold bg-blue-500 rounded hover:bg-blue-600 transition duration-300">
            開始使用
          </button>
        </div>
        <div className="md:w-1/2 flex justify-center items-center">
          <Image
            className="w-auto cursor-pointer"
            src="/FRC.jpg"
            alt="FRC Icon"
            width={256}
            height={256}
          />
        </div>
      </div>
    </div>
  )
}
