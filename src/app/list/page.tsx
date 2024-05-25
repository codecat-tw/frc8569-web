'use client';
import { useSession } from 'next-auth/react';
import ListItems from "../components/ListItems";

export default function List() {
  const session = useSession();
  const userEmail = session?.data?.user?.email || 'ErrorUser';

  if (!session || !userEmail.endsWith('@mail2.chshs.ntpc.edu.tw')) {
    return <p>拒絕存取，你的帳號不屬於中和高中。</p>;
  }

  return (
    <>
      <div>
        <h1>活動清單</h1>
        <ListItems />
      </div>
    </>
  )
}
