import { Activity } from "@/types/activity";
import Link from "next/link";
import { useState } from "react";

export default function ActivityCard({ activity }: { activity: Activity }) {
  const [openEvent, setOpenEvent] = useState<{ [key: string]: boolean }>({});
  const toggleMembersList = (id: string) => {
    setOpenEvent((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <div>
      <p>活動日期: {activity.date}</p>
      <Link href={`/events/${activity.id}`}>
        <span className="text-blue-500 hover:underline">
          活動名稱: {activity.name}
        </span>
      </Link>
      <p>開始時間: {activity.start}</p>
      <p>結束時間: {activity.end}</p>
      <p>使用分區: {activity.area}</p>
      <p>活動代表: {activity.applyName}</p>
      <p>指導老師: {activity.teacher}</p>
      <p>場地狀態: {activity.status}</p>
      <p>場地評語: {activity.remark}</p>
      <div className="mt-2">
        <h2
          className="cursor-pointer text-lg font-bold"
          onClick={() => toggleMembersList(activity.id)}
        >
          成員名單 {openEvent[activity.id] ? "▲" : "▼"}
        </h2>
        {openEvent[activity.id] && (
          <ul className="flex list-none flex-wrap justify-center">
            {activity.members.map((member, index) => (
              <li key={index} className="mr-2 text-center">
                <p>{member.name}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
