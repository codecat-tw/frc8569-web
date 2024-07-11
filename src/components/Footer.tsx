import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto flex flex-wrap text-center justify-around">
        <div className="w-full md:w-1/3 px-4 mb-8 md:mb-0">
          <h3 className="text-xl font-semibold mb-4">網站資訊</h3>
          <p>FRC 管理團隊</p>
          <p>© 2024 所有權利保留</p>
          <p>網站版本: 1.0.0</p>
        </div>
        <div className="w-full md:w-1/3 px-4 mb-8 md:mb-0">
          <h3 className="text-xl font-semibold mb-4">開發團隊</h3>
          <p>開發人員: <a href="https://kuang-ti.com" className="text-blue-400 hover:text-blue-600 transition duration-300">楊光地</a></p>
          <p>技術支援: <a href="https://www.instagram.com/codecat.tw" className="text-blue-400 hover:text-blue-600 transition duration-300">程式貓團隊</a></p>
        </div>
        <div className="w-full md:w-1/3 px-4">
          <h3 className="font-semibold mb-4">相關連結</h3>
          <ul className="list-none p-0 space-y-2">
            <li>
              <Link href="https://sites.google.com/mail2.chshs.ntpc.edu.tw/frc8569">
                <span className="text-blue-400 hover:text-blue-600 transition duration-300">協作平台</span>
              </Link>
            </li>
            <li>
              <Link href="https://github.com/frc-8569">
                <span className="text-blue-400 hover:text-blue-600 transition duration-300">程式碼庫</span>
              </Link>
            </li>
            <li>
              <Link href="https://drive.google.com/drive/folders/0AK5XgMdsCI4uUk9PVA">
                <span className="text-blue-400 hover:text-blue-600 transition duration-300">團隊檔案</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
