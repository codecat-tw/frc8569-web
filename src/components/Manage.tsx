"use client";

import { useState, FormEvent, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getActivitytList, approveActivity, deleteActivity, updateRemark } from "@/actions/activity";
import { Activity } from "@/types/activity";
import Loading from "@/components/layout/Loading";
import ActivityCard from "./ActivityCard";

export default function Page() {
  const [items, setItems] = useState<Activity[]>([]);
  const [remark, setRemark] = useState<{ [key: string]: string }>({});
  const { status } = useSession();

  const handleRemarkChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
  ) => {
    setRemark((prevState) => ({
      ...prevState,
      [id]: e.target.value,
    }));
  };

  useEffect(() => {
    getActivitytList().then(setItems).catch(console.error);
  }, []);

  function handleApprove(id: string) {
    if (window.confirm("你確定要同意這個活動嗎？")) {
      approveActivity(id)
        .then(() => {
          alert("已批准活動");
        })
        .catch(console.error);
    }
  }

  function handleDelete(id: string) {
    if (window.confirm("你確定要刪除這個活動嗎？")) {
      deleteActivity(id)
        .then(() => {
          alert("活動成功刪除");
        })
        .catch(console.error);
    }
  }

  const handleSubmit = async (e: FormEvent, id: string) => {
    e.preventDefault();

    const activityRemark = remark[id];

    if (window.confirm("你確定要傳送活動評語嗎?")) {
      try {
        await updateRemark(id, activityRemark);
        alert("已傳送活動評語");
      } catch (error) {
        if (error instanceof Error) {
          alert("傳送評語失敗: " + error.message);
        } else {
          alert("傳送評語失敗，未知錯誤");
        }
      }
    }
  };

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      <h1 className="py-4 text-center text-4xl font-bold">場地審核</h1>
      <div className="mx-auto my-2 w-11/12 max-w-md rounded-lg border bg-white p-4 text-center shadow-lg">
        <ul>
          {items
            .slice()
            .reverse()
            .map((item) => (
              <li key={item.id} className="border-b-2 p-2">
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
                  className="rounded-sm border bg-green-400 p-1 text-white"
                >
                  接受申請
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="rounded-sm border bg-red-400 p-1 text-white"
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
