'use client';
import { signOut, useSession } from 'next-auth/react';

import AddItem from './components/AddItem'
import ListItems from "./components/ListItems";

export default function Home() {
  const session = useSession();
  return (
    <>
      <div >{session?.data?.user?.name }</div>
      <button onClick={() => signOut()}>登入</button>
      <div>
      <h1>Welcome to My Next.js App</h1>
      <AddItem />
      <ListItems />
    </div>
    </>
  )
}
