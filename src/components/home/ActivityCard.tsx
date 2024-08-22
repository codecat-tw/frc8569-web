import { Icon } from '@iconify/react';

export default function About() {
  return (
    <div className="container mx-auto flex flex-col px-4 sm:px-8">
      <div className="flex flex-col md:flex-row items-center bg-blue-100 p-4 sm:p-8">
        <div className="w-full md:w-1/2 flex justify-center items-center p-4">
          <Icon icon="ic:round-format-shapes" width="128" height="128" />
        </div>
        <div className="w-full md:w-1/2 mt-4 md:mt-0 md:ml-4">
          <h2 className="mb-2 text-2xl sm:text-3xl font-bold text-gray-800">活動報名</h2>
          <p className="mb-4 text-sm sm:text-base text-gray-600">
            系統提供完整的報名與管理系統，並支援「連結自動報名」，使成員報名流程更加簡便。對於管理者而言，後台的審核機制也十分完善，一目了然即可知道活動狀況！
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