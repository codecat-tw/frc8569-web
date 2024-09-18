import "./globals.css";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import SessionProvider from "@/components/SessionProvider";
import LoginInfo from "@/components/LoginInfo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
          <LoginInfo />
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
