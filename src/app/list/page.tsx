'use client';
import { useSession } from 'next-auth/react';
import ShowList from "../components/ShowList";
import NoPurview from "../components/NoPurview";

export default function List() {
  const session = useSession();
  const userEmail = session?.data?.user?.email || 'ErrorUser';

  if (!session || !userEmail.endsWith('@mail2.chshs.ntpc.edu.tw')) {
    return <NoPurview />;
  }

  return (
    <>
      <div>
        <h1>活動清單</h1>
        <ShowList />
      </div>
    </>
  )
}
