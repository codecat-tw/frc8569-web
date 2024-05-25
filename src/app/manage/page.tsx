'use client';
import { useSession } from 'next-auth/react';
import ApplyList from "../components/ApplyList";

const adminEmails = [
  'eric29433453@gmail.com',
  '110330@mail2.chshs.ntpc.edu.tw'
];

export default function Home() {
  const session = useSession();
  const userEmail = session?.data?.user?.email || 'ErrorUser';

  if (!session || !adminEmails.includes(userEmail)) {
    return <p>拒絕存取，你沒有審核權限。</p>;
  }

  return (
    <>
      <h1>場地審核</h1>
      <ApplyList />
    </>
  )
}
