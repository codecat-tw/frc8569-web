'use client';
import { signOut, useSession } from 'next-auth/react';
import ListItems from "../components/ListItems";

export default function Home() {
  const session = useSession();
  return (
    <>
      <div>
        <h1>活動清單</h1>
        <ListItems />
      </div>
    </>
  )
}
