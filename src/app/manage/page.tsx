"use client";
import React, { useState, FormEvent } from "react";
import { useSession } from "next-auth/react";
import GetEventList from "@/components/firebase/GetEventList";
import { approveActivity } from "@/actions/agreeAction";
import { deleteActivity } from "@/actions/deleteItem";
import { updateRemark } from "@/actions/updateRemark";
import NoPurview from "@/components/NoPurview";
import Loading from "@/components/Loading";

const adminEmails = [
  "eric29433453@gmail.com",
  "110330@mail2.chshs.ntpc.edu.tw",
  "kkbike@mail2.chshs.ntpc.edu.tw",
];

const Manage: React.FC = () => {
  const items = GetEventList();
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email || "ErrorUser";
  const [remark, setRemark] = useState("");

  const [openEvent, setOpenEvent] = useState<{ [key: string]: boolean }>({});
  const toggleMembersList = (id: string) => {
    setOpenEvent((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

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

    if (window.confirm("你確定要傳送活動評語嗎?")) {
      try {
        await updateRemark(id, remark);
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

  if (!session || !adminEmails.includes(userEmail)) {
    return <NoPurview />;
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
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                    placeholder="輸入備註"
                    className="mb-2 rounded border p-1"
                  />
                  <button
                    type="submit"
                    className="rounded border bg-gray-400 p-1 text-white"
                  >
                    傳送評語
                  </button>
                </form>
                <button
                  onClick={() => handleUpdate(item.id)}
                  className="rounded border bg-green-400 p-1 text-white"
                >
                  接受申請
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="rounded border bg-red-400 p-1 text-white"
                >
                  刪除項目
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Manage;
