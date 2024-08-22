import { Icon } from '@iconify/react';

export default function About() {
  return (
    <div className="container mx-auto flex flex-col px-4 sm:px-8">
      <div className="flex flex-col md:flex-row items-center bg-blue-100 p-4 sm:p-8">
        <div className="w-full md:w-1/2 flex justify-center items-center p-4">
        <Icon icon="ic:twotone-phone-forwarded" width="128" height="128" />
        </div>
        <div className="w-full md:w-1/2 mt-4 md:mt-0 md:ml-4">
          <h2 className="mb-2 text-2xl sm:text-3xl font-bold text-gray-800">客服支援</h2>
          <p className="mb-4 text-sm sm:text-base text-gray-600">
          遇到問題或是想提供建議嗎？此網站由楊光地與程式貓團隊協同開發，歡迎隨時聯繫。
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