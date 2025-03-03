"use client";

import { useState, FormEvent, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getActivitytList } from "@/actions/activity";
import { approveActivity } from "@/actions/activity";
import { deleteActivity } from "@/actions/activity";
import { updateRemark } from "@/actions/activity";
import Loading from "@/components/layout/Loading";

interface Member {
  name: string;
}

interface Item {
  id: string;
  date: string;
  name: string;
  start: string;
  end: string;
  area: string;
  applyEmail: string;
  applyName: string;
  teacher: string;
  status: string;
  remark: string;
  members: Member[];
}

export default function Page() {
  const [items, setItems] = useState<Item[]>([]);
  const { status } = useSession();
  const [remark, setRemark] = useState<{ [key: string]: string }>({});

  const [openEvent, setOpenEvent] = useState<{ [key: string]: boolean }>({});
  const toggleMembersList = (id: string) => {
    setOpenEvent((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
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

  useEffect(() => {
    const fetchItems = async () => {
      const eventList = await getActivitytList();
      console.log(eventList);

      if ("message" in eventList) {
      } else {
        setItems(eventList);
      }
    };

    fetchItems();
  }, []);

  const handleUpdate = async (id: string) => {
    if (window.confirm("你確定要同意這個活動嗎？")) {
      try {
        await approveActivity(id);
        alert("已批准活動");
      } catch (error) {
        if (error instanceof Error) {
          alert("批准失敗: " + error.message);
        } else {
          alert("批准失敗，未知錯誤");
        }
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("你確定要刪除這個活動嗎？")) {
      try {
        await deleteActivity(id);
        alert("活動成功刪除");
      } catch (error) {
        if (error instanceof Error) {
          alert(`刪除失敗: ${error.message}`);
        } else {
          alert("刪除失敗，未知錯誤");
        }
      }
    }
  };

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
                <p>活動日期: {item.date}</p>
                <p>活動名稱: {item.name}</p>
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
                  onClick={() => handleUpdate(item.id)}
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
