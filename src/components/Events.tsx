"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getActivitytList, joinEvent } from "@/actions/activity";
import { Activity } from "@/types/activity";
import ActivityCard from "./ActivityCard";

export default function Page() {
  const [items, setItems] = useState<Activity[]>([]);
  const { status } = useSession();

  useEffect(() => {
    getActivitytList().then(setItems).catch(console.error);
  }, []);

  const handleJoinEvent = async (id: string) => {
    await joinEvent(id);
  };

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
