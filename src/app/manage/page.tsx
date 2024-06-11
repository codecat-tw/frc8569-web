'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import GetEventList from "../../components/firebase/GetEventList";
import AgreeButton from "../../components/firebase/AgreeButton";
import DeleteButton from "../../components/firebase/DeleteButton";
import RemarkUpdate from "../../components/firebase/RemarkUpdate";
import NoPurview from "../../components/NoPurview";
import Loading from "../../components/Loading";

const adminEmails = [
  'eric29433453@gmail.com',
  '110330@mail2.chshs.ntpc.edu.tw'
];

const Manage: React.FC = () => {
  const items = GetEventList();
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email || 'ErrorUser';

  const [openEvent, setOpenEvent] = useState<{ [key: string]: boolean }>({});
  const toggleMembersList = (id: string) => {
    setOpenEvent(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  if (status === 'loading') {
    return <Loading />;
  }

  if (!session || !adminEmails.includes(userEmail)) {
    return <NoPurview />;
  }

  return (
    <div className='text-black min-h-screen bg-blue-100 overflow-x-hidden'>
      <h1 className='text-center text-4xl font-bold py-4'>場地審核</h1>
      <div className="border w-11/12 max-w-md mx-auto text-center p-4 my-2 bg-white shadow-lg rounded-lg">
        <ul>
          {items.slice().reverse().map((item) => (
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
                <h2 className="text-lg font-bold cursor-pointer" onClick={() => toggleMembersList(item.id)}>
                  成員名單 {openEvent[item.id] ? '▲' : '▼'}
                </h2>
                {openEvent[item.id] && (
                  <ul className="flex flex-wrap justify-center list-none">
                    {item.members.map((member, index) => (
                      <li key={index} className="mr-2 text-center">
                        <p>{member.name}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <RemarkUpdate id={item.id} />
              <AgreeButton id={item.id} />
              <DeleteButton id={item.id} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Manage;
