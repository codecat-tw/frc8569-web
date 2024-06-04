import { authOptions } from '../../pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth'
import './globals.css'
import { Inter } from 'next/font/google'
import SessionProvider from './SessionProvider';
import Login from './Login';
import Navbar from "../components/Navbar";
import FirebaseLoginTracker from "../components/FirebaseLoginTracker"; // 新增這行

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'FRC8569',
  description: 'FRC團隊管理系統',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
      <SessionProvider session={session}>
        {!session ? (
          <Login/>
        ): (
          <div>
            <FirebaseLoginTracker />
            <Navbar />
            {children}
          </div>
        )}
      </SessionProvider>
      </body>
    </html>
  )
}
