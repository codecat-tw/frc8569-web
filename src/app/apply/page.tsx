'use client';
import { useSession } from 'next-auth/react';
import AddItem from '../components/AddItem'

export default function Apply() {
  const session = useSession();
  return (
    <>
      <AddItem />
    </>
  )
}
