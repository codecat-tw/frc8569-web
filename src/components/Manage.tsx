"use client";

import { useState, FormEvent, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { Activity } from "@/types/activity";
import ActivityCard from "./ActivityCard";
import { Send, Check, Trash2 } from "lucide-react";
import Loading from "@/components/layout/Loading";
import Unauth from "@/components/layout/Unauth";
import {
  getActivityList,
  approveActivity,
  deleteActivity,
  updateRemark,
} from "@/actions/activity";

export default function Manage() {
  const [items, setItems] = useState<Activity[]>([]);
  const [remark, setRemark] = useState<{ [key: string]: string }>({});
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!session) return;
    getActivityList().then(setItems).catch(console.error);
  }, [session]);

  function handleApprove(id: string) {
    approveActivity(id)
      .then(() => {
        alert("已批准活動");
      })
      .catch(console.error);
  }

  function handleDelete(id: string) {
    deleteActivity(id)
      .then(() => {
        alert("活動成功刪除");
      })
      .catch(console.error);
  }

  async function handleSubmit(e: FormEvent, id: string) {
    e.preventDefault();

    updateRemark(id, remark[id])
      .then(() => {
        alert("已傳送活動評語");
      })
      .catch(console.error);
  }

  function handleRemarkChange(
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
  ) {
    setRemark((prevState) => ({
      ...prevState,
      [id]: e.target.value,
    }));
  }

  if (isPending) return <Loading />;
  if (!session) return <Unauth />;

  console.log("Session data:", session);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <h1 className="py-4 text-center text-4xl font-bold">場地審核</h1>
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
                <form
                  onSubmit={(e: FormEvent) => handleSubmit(e, item.id)}
                  className="flex"
                >
                  <input
                    type="text"
                    value={remark[item.id] || ""}
                    onChange={(e) => handleRemarkChange(e, item.id)}
                    placeholder="輸入活動評語"
                    className="mb-2 w-full rounded-sm border p-1"
                  />
                  <button
                    type="submit"
                    className="mb-2 ml-2 flex w-12 items-center justify-center rounded-sm border bg-gray-400 p-1 text-white hover:bg-gray-500"
                  >
                    <Send />
                  </button>
                </form>

                <button
                  onClick={() => handleApprove(item.id)}
                  className="my-2 flex w-full items-center justify-center rounded-md bg-green-400 p-2 text-white hover:bg-green-500"
                >
                  <Check className="mr-2" />
                  接受申請
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="my-2 flex w-full items-center justify-center rounded-md bg-red-400 p-2 text-white hover:bg-red-500"
                >
                  <Trash2 className="mr-2" />
                  刪除項目
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
