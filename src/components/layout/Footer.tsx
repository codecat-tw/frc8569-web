import Link from "next/link";
import { version } from "../../../package.json";

export default function Footer() {
  return (
    <footer className="bg-gray-800 py-8 text-white">
      <div className="container mx-auto flex flex-wrap justify-around text-center">
        <div className="mb-8 w-full px-4 md:mb-0 md:w-1/3">
          <h3 className="mb-4 text-xl font-semibold">網站資訊</h3>
          <p>中和高中 FRC8569</p>
          <p>© 2024-205 版權所有</p>
          <p>網站版本: {version}</p>
        </div>
        <div className="mb-8 w-full px-4 md:mb-0 md:w-1/3">
          <h3 className="mb-4 text-xl font-semibold">開發團隊</h3>
          <p>
            開發人員:{" "}
            <a
              href="https://www.kuang-ti.com"
              className="text-blue-400 transition duration-300 hover:text-blue-600"
            >
              楊光地
            </a>
          </p>
          <p>
            技術支援:{" "}
            <a
              href="https://www.codecat.tw"
              className="text-blue-400 transition duration-300 hover:text-blue-600"
            >
              程式貓
            </a>
          </p>
        </div>
        <div className="w-full px-4 md:w-1/3">
          <h3 className="mb-4 text-xl font-semibold">相關連結</h3>
          <ul className="list-none space-y-2 p-0">
            <li>
              <Link href="https://sites.google.com/mail2.chshs.ntpc.edu.tw/frc8569">
                <span className="text-blue-400 transition duration-300 hover:text-blue-600">
                  協作平台
                </span>
              </Link>
            </li>
            <li>
              <Link href="https://github.com/frc-8569">
                <span className="text-blue-400 transition duration-300 hover:text-blue-600">
                  程式碼庫
                </span>
              </Link>
            </li>
            <li>
              <Link href="https://drive.google.com/drive/folders/0AK5XgMdsCI4uUk9PVA">
                <span className="text-blue-400 transition duration-300 hover:text-blue-600">
                  團隊檔案
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
