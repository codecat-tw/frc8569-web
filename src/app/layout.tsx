import "./globals.css";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SessionProvider from "@/components/layout/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    template: "%s | FRC8569",
    default: "FRC8569 - 中和高中機器人校隊",
  },
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
