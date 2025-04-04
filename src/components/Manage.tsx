"use client";

import { useState, FormEvent, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  getActivitytList,
  approveActivity,
  deleteActivity,
  updateRemark,
} from "@/actions/activity";
import { Activity } from "@/types/activity";
import ActivityCard from "./ActivityCard";

export default function Page() {
  const [items, setItems] = useState<Activity[]>([]);
  const [remark, setRemark] = useState<{ [key: string]: string }>({});
  const { status } = useSession();

  useEffect(() => {
    getActivitytList().then(setItems).catch(console.error);
  }, []);

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

  const handleSubmit = async (e: FormEvent, id: string) => {
    e.preventDefault();

    updateRemark(id, remark[id])
      .then(() => {
        alert("已傳送活動評語");
      })
      .catch(console.error);
  };

  const handleRemarkChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
  ) => {
    setRemark((prevState) => ({
      ...prevState,
      [id]: e.target.value,
    }));
  };

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
                className="border-2 p-2 m-4 border-gray-300 rounded-lg"
              >
                <ActivityCard activity={item} />
                <form onSubmit={(e: FormEvent) => handleSubmit(e, item.id)}>
                  <input
                    type="text"
                    value={remark[item.id] || ""}
                    onChange={(e) => handleRemarkChange(e, item.id)}
                    placeholder="輸入備註"
                    className="mb-2 rounded-sm border p-1"
                  />
                  <button
                    type="submit"
                    className="rounded-sm border bg-gray-400 p-1 text-white"
                  >
                    傳送評語
                  </button>
                </form>
                <button
                  onClick={() => handleApprove(item.id)}
                  className="rounded-md bg-green-400 p-2 w-full cursor-pointer"
                >
                  接受申請
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="rounded-md bg-red-400 p-2 w-full cursor-pointer"
                >
                  刪除項目
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
