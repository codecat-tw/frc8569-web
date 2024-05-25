'use client';
import { signOut, useSession } from 'next-auth/react';

import AddItem from '../components/AddItem'
import ListItems from "../components/ListItems";
import Nabar from "../components/Nabar";
import About from "../components/About";

export default function Home() {
  const session = useSession();
  return (
    <>
      <Nabar/>
      <div>
        <h1>活動清單</h1>
        <ListItems />
      </div>
    </>
  )
}
