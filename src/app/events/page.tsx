"use client";
import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";
import GetEventList from "@/components/firebase/GetEventList";
import NoPurview from "@/components/NoPurview";
import Loading from "@/components/Loading";
import JoinButton from "@/components/firebase/JoinButton";

const List: React.FC = () => {
  const items = GetEventList();
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email || "ErrorUser";
  const userName = session?.user?.name || "ErrorUser";

  const [openEvent, setOpenEvent] = useState<{ [key: string]: boolean }>({});
  const toggleMembersList = (id: string) => {
    setOpenEvent((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  if (status === "loading") {
    return <Loading />;
  }

  /*if (!session || !userEmail.endsWith("@mail2.chshs.ntpc.edu.tw")) {
    return <NoPurview />;
  }
    */

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
                <JoinButton
                  id={item.id}
                  userEmail={userEmail}
                  userName={userName}
                />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default List;
