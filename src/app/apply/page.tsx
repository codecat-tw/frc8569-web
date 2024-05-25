'use client';
import { signOut, useSession } from 'next-auth/react';
import AddItem from '../components/AddItem'

export default function Home() {
  const session = useSession();
  return (
    <>
      <AddItem />
    </>
  )
}
