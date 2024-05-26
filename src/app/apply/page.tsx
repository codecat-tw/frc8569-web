'use client';
import { useSession } from 'next-auth/react';
import ApplyItem from '../components/ApplyItem'

export default function Apply() {
  const session = useSession();
  const userEmail = session?.data?.user?.email || 'user@error.com';

  return (
    <>
      <ApplyItem applyEmail={userEmail} />
    </>
  )
}
