'use client';
import { signOut, useSession } from 'next-auth/react';
import AddItem from '../components/AddItem'
import About from "../components/About";

export default function Home() {
  const session = useSession();
  return (
    <>
      <h1>123456</h1>
    </>
  )
}
