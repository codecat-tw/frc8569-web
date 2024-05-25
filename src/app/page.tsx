'use client';
import { signOut, useSession } from 'next-auth/react';

import AddItem from './components/AddItem'
import ListItems from "./components/ListItems";

export default function Home() {
  const session = useSession();
  return (
    <>
      <div >{session?.data?.user?.name }</div>
      <div >{session?.data?.user?.email }</div>
      <button onClick={() => signOut()}>登出</button>
      <AddItem />
      <div>
        <h1>活動清單</h1>
        <ListItems />
      </div>
    </>
  )
}
