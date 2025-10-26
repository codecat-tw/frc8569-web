"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { getActivityList, joinEvent } from "@/actions/activity";
import { Activity } from "@/types/activity";
import ActivityCard from "./ActivityCard";
import Loading from "@/components/layout/Loading";
import Unauth from "@/components/layout/Unauth";

export default function Events() {
  const [items, setItems] = useState<Activity[]>([]);
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    getActivityList().then(setItems).catch(console.error);
  }, [session]);

  async function handleJoinEvent(id: string) {
    await joinEvent(id);
  }

  if (isPending) return <Loading />;
  if (!session) return <Unauth />;

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
                className="m-4 rounded-lg border border-gray-300 p-4"
              >
                <ActivityCard activity={item} />
                <button
                  onClick={() => handleJoinEvent(item.id)}
                  className="my-2 w-full cursor-pointer rounded-md bg-orange-400 p-2"
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
