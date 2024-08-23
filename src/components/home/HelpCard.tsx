import { Icon } from "@iconify/react";

export default function About() {
  return (
    <div className="container mx-auto flex flex-col px-4 sm:px-8">
      <div className="flex flex-col items-center bg-blue-100 p-4 sm:p-8 md:flex-row">
        <div className="flex w-full items-center justify-center p-4 md:w-1/2">
          <Icon icon="ic:twotone-phone-forwarded" width="128" height="128" />
        </div>
        <div className="mt-4 w-full md:ml-4 md:mt-0 md:w-1/2">
          <h2 className="mb-2 text-2xl font-bold text-gray-800 sm:text-3xl">
            客服支援
          </h2>
          <p className="mb-4 text-sm text-gray-600 sm:text-base">
            遇到問題或是想提供建議嗎？此網站由楊光地與程式貓團隊協同開發，歡迎隨時聯繫。
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
