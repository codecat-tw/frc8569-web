import { Icon } from '@iconify/react';

export default function About() {
  return (
    <div className="container mx-auto flex flex-col px-4 sm:px-8">
      <div className="flex flex-col md:flex-row items-center bg-blue-100 p-4 sm:p-8">
        <div className="w-full md:w-1/2 flex justify-center items-center p-4">
        <Icon icon="ic:outline-screen-search-desktop" width="128" height="128" />
        </div>
        <div className="w-full md:w-1/2 mt-4 md:mt-0 md:ml-4">
          <h2 className="mb-2 text-2xl sm:text-3xl font-bold text-gray-800">查詢活動</h2>
          <p className="mb-4 text-sm sm:text-base text-gray-600">
          系統採用Google公司提供的資料庫，讀寫速度是原系統的十倍以上。使用此系統可以有效節約時間，更快了解整個活動概況。
          </p>
          <div className="flex justify-center md:justify-start">
            <button className="py-3 px-5 sm:py-2 sm:px-4 text-white font-semibold bg-blue-500 rounded hover:bg-blue-600 transition duration-300">
              開始使用
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
