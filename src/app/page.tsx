'use client';
import { signOut, useSession } from 'next-auth/react';

import AddItem from './AddItem';

export default function Home() {
  const session = useSession();
  return (
    <>
      <div >{session?.data?.user?.name }</div>
      <button onClick={() => signOut()}>登入</button>
      <div>
      <h1>Welcome to My Next.js App</h1>
      <AddItem />
    </div>
    </>
  )
}
