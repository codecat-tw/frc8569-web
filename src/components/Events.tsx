"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { getActivitytList, joinEvent } from "@/actions/activity";
import NoPurview from "@/components/layout/NoPurview";
import Loading from "@/components/layout/Loading";
import { Activity } from "@/types/activity";

export default function Page() {
  const [items, setItems] = useState<Activity[]>([]);
  const [hasPermission, setHasPermission] = useState(true);
  const { status } = useSession();

  const [openEvent, setOpenEvent] = useState<{ [key: string]: boolean }>({});
  const toggleMembersList = (id: string) => {
    setOpenEvent((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

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
                <p>活動日期: {item.date}</p>
                <Link href={`/events/${item.id}`}>
                  <span className="text-blue-500 hover:underline">
                    活動名稱: {item.name}
                  </span>
                </Link>
                <p>開始時間: {item.start}</p>
                <p>結束時間: {item.end}</p>
                <p>使用分區: {item.area}</p>
                <p>活動代表: {item.applyName}</p>
                <p>指導老師: {item.teacher}</p>
                <p>場地狀態: {item.status}</p>
                <p>場地評語: {item.remark}</p>
                <div className="mt-2">
                  <h2
                    className="cursor-pointer text-lg font-bold"
                    onClick={() => toggleMembersList(item.id)}
                  >
                    成員名單 {openEvent[item.id] ? "▲" : "▼"}
                  </h2>
                  {openEvent[item.id] && (
                    <ul className="flex list-none flex-wrap justify-center">
                      {item.members.map((member, index) => (
                        <li key={index} className="mr-2 text-center">
                          <p>{member.name}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
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
