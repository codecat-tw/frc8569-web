import { Activity } from "@/types/activity";
import Link from "next/link";

export default function ActivityCard({ activity }: { activity: Activity }) {
  return (
    <div className="text-lg">
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
    </div>
  );
}
