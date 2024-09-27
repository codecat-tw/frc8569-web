import "./globals.css";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SessionProvider from "@/components/layout/SessionProvider";
import UserInfo from "@/components/layout/UserInfo";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "中和高中 FRC8569",
  description: "中和高中FRC系統-從介紹到管理",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-Hant">
      <body className={inter.className}>
        <GoogleAnalytics gaId="G-0BCZ9VLRYQ" />
        <SessionProvider>
          <UserInfo />
          <div className="bg-blue-100 text-black">
            <Navbar />
            {children}
            <Footer />
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
