'use client';
import { useSession } from 'next-auth/react';
import About from "./components/About";

export default function Home() {
  const session = useSession();
  return (
    <>
      <About />
    </>
  )
}
