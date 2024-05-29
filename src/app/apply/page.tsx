'use client';
import { useSession } from 'next-auth/react';
import ApplyItem from '../components/ApplyItem'
import NoPurview from "../components/NoPurview";

export default function Apply() {
  const session = useSession();
  const userEmail = session?.data?.user?.email || 'user@error.com';

  if (!session || !userEmail.endsWith('@mail2.chshs.ntpc.edu.tw')) {
    return <NoPurview />;
  }

  return (
    <>
      <ApplyItem userEmail={userEmail} />
    </>
  )
}
