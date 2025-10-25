import { Activity } from "@/types/activity";
import Link from "next/link";
import { MapPin, User, Book, Check, MessageSquare } from "lucide-react";

export default function ActivityCard({ activity }: { activity: Activity }) {
  return (
    <div className="space-y-2 rounded-lg p-4 text-lg">
      <div className="text-center text-2xl font-bold">
        <Link
          href={`/events/${activity.id}`}
          className="text-blue-500 hover:underline"
        >
          {activity.name}
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <span>{activity.date}</span>
        <span>{activity.start}</span>
        <span>{activity.end}</span>
      </div>
      <div className="flex items-center gap-2">
        <MapPin className="text-purple-500" />
        <span>使用分區: {activity.area}</span>
      </div>
      <div className="flex items-center gap-2">
        <User className="text-indigo-500" />
        <span>活動代表: {activity.applyName}</span>
      </div>
      <div className="flex items-center gap-2">
        <Book className="text-teal-500" />
        <span>指導老師: {activity.teacher}</span>
      </div>
      <div className="flex items-center gap-2">
        <Check className="text-green-600" />
        <span>場地狀態: {activity.status}</span>
      </div>
      <div className="flex items-center gap-2">
        <MessageSquare className="text-gray-600" />
        <span>場地評語: {activity.remark}</span>
      </div>
    </div>
  );
}
