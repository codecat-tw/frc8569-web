'use client';
import { useSession } from 'next-auth/react';
import AddItem from '../components/AddItem'

export default function Apply() {
  const session = useSession();
  const userEmail = session?.data?.user?.email || 'user@error.com';

  return (
    <>
      <AddItem applyEmail={userEmail} />
    </>
  )
}
