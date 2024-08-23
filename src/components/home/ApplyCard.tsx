import { Icon } from "@iconify/react";

export default function About() {
  return (
    <div className="container mx-auto flex flex-col px-4 sm:px-8">
      <div className="flex flex-col items-center bg-blue-100 p-4 sm:p-8 md:flex-row">
        <div className="flex w-full items-center justify-center p-4 md:w-1/2">
          <Icon
            icon="ic:outline-screen-search-desktop"
            width="128"
            height="128"
          />
        </div>
        <div className="mt-4 w-full md:ml-4 md:mt-0 md:w-1/2">
          <h2 className="mb-2 text-2xl font-bold text-gray-800 sm:text-3xl">
            查詢活動
          </h2>
          <p className="mb-4 text-sm text-gray-600 sm:text-base">
            系統採用Google公司提供的資料庫，讀寫速度是原系統的十倍以上。使用此系統可以有效節約時間，更快了解整個活動概況。
          </p>
          <div className="flex justify-center md:justify-start">
            <button className="rounded bg-blue-500 px-5 py-3 font-semibold text-white transition duration-300 hover:bg-blue-600 sm:px-4 sm:py-2">
              開始使用
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
