'use client';
import { useSession } from 'next-auth/react';

export default function Home() {
  const session = useSession();
  const userEmail = session?.data?.user?.email || 'ErrorUser';

  if (!session || !userEmail.endsWith('@mail2.chshs.ntpc.edu.tw')) {
    return <p>拒絕存取，你的帳號不屬於中和高中。</p>;
  }

  return (
    <>
      <h1>場地審核</h1>
    </>
  )
}
