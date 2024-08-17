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
          <h2 className="mb-4 text-3xl font-bold text-gray-800">活動報名</h2>
          <p className="mb-6 text-gray-600">
            系統提供完整的報名與管理系統，並支援「連結自動報名」，使成員報名流程更加簡便。對於管理者而言，後台的審核機制也十分完善，一目了然即可知道活動狀況！
          </p>
          <button className="py-2 px-4 text-white font-semibold bg-blue-500 rounded hover:bg-blue-600 transition duration-300">
            開始使用
          </button>
        </div>
      </div>
    </div>
  )
}