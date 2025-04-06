"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getActivitytList, joinEvent } from "@/actions/activity";
import { Activity } from "@/types/activity";
import ActivityCard from "./ActivityCard";
import Loading from "@/components/layout/Loading";
import Unauth from "@/components/layout/Unauth";

export default function Events() {
  const [items, setItems] = useState<Activity[]>([]);
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated")
      getActivitytList().then(setItems).catch(console.error);
  }, [status]);

  async function handleJoinEvent(id: string) {
    await joinEvent(id);
  }

  if (status === "loading") return <Loading />;
  if (status === "unauthenticated") return <Unauth />;

  return (
    <div className="min-h-screen overflow-x-hidden">
      <h1 className="py-4 text-center text-4xl font-bold">活動清單</h1>
      <div className="mx-auto my-2 max-w-lg">
        <ul>
          {items
            .slice()
            .reverse()
            .map((item) => (
              <li
                key={item.id}
                className="border p-4 m-4 border-gray-300 rounded-lg"
              >
                <ActivityCard activity={item} />
                <button
                  onClick={() => handleJoinEvent(item.id)}
                  className="rounded-md bg-orange-400 my-2 p-2 w-full cursor-pointer"
                >
                  報名活動
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
