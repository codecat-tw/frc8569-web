'use client';
import { useSession } from 'next-auth/react';
import ManageList from "../components/ManageList";
import NoPurview from "../components/NoPurview";

const adminEmails = [
  'eric29433453@gmail.com',
  '110330@mail2.chshs.ntpc.edu.tw'
];

export default function Home() {
  const session = useSession();
  const userEmail = session?.data?.user?.email || 'ErrorUser';

  if (!session || !adminEmails.includes(userEmail)) {
    return <NoPurview />;
  }

  return (
    <div className='min-h-screen bg-blue-100'>
      <h1>場地審核</h1>
      <ManageList />
    </div>
  )
}
