"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { getActivitytList, joinEvent } from "@/actions/activity";
import NoPurview from "@/components/layout/NoPurview";
import Loading from "@/components/layout/Loading";
import { Activity } from "@/types/activity";
import ActivityCard from "./ActivityCard";

export default function Page() {
  const [items, setItems] = useState<Activity[]>([]);
  const [hasPermission, setHasPermission] = useState(true);
  const { status } = useSession();

  useEffect(() => {
    getActivitytList().then(setItems).catch(console.error);
  }, []);

  const handleJoinEvent = async (id: string) => {
    await joinEvent(id);
  };

  if (status === "loading") {
    return <Loading />;
  }

  if (!hasPermission) {
    return <NoPurview />;
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      <h1 className="py-4 text-center text-4xl font-bold">活動清單</h1>
      <div className="mx-auto my-2 w-11/12 max-w-md rounded-lg border bg-white p-4 text-center shadow-lg">
        <ul>
          {items
            .slice()
            .reverse()
            .map((item) => (
              <li key={item.id} className="border-b-2 p-2">
                <ActivityCard activity={item} />
                <button
                  onClick={() => handleJoinEvent(item.id)}
                  className="rounded-sm border bg-orange-400 p-1 text-white"
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
