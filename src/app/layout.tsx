import { authOptions } from '../../pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth'
import './globals.css'
import { Inter } from 'next/font/google'
import SessionProvider from './SessionProvider';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoginInfo from "../components/firebase/LoginInfo";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'FRC8569',
  description: '中和高中FRC系統-從介紹到管理',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="zh-Hant">
      <body className={inter.className}>
      <GoogleAnalytics gaId="G-0BCZ9VLRYQ" />
      <SessionProvider session={session}>
        <div className='bg-blue-100'>
          <Navbar />
          {children}
          <Footer />
        </div>
      </SessionProvider>
      </body>
    </html>
  )
}
