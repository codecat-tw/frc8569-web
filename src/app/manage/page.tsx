'use client';
import { useSession } from 'next-auth/react';
import GetEventList from "../components/GetEventList";
import NoPurview from "../components/NoPurview";
import Loading from "../components/Loading";
import AgreeButton from "../components/AgreeButton";
import DeleteButton from "../components/DeleteButton";

const adminEmails = [
  'eric29433453@gmail.com',
  '110330@mail2.chshs.ntpc.edu.tw'
];

const Manage: React.FC = () => {
  const items = GetEventList();
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email || 'ErrorUser';

  if (status === 'loading') {
    return <Loading />;
  }

  if (!session || !adminEmails.includes(userEmail)) {
    return <NoPurview />;
  }

  return (
    <div className='min-h-screen bg-blue-100 overflow-x-hidden'>
      <h1 className='text-center text-4xl font-bold py-4'>場地審核</h1>
      <div className="border w-11/12 max-w-md mx-auto text-center p-4 bg-white shadow-lg rounded-lg">
        <ul>
          {items.slice().reverse().map((item) => (
            <li key={item.id} className="border-b-2 p-2">
              <p>活動日期: {item.date}</p>
              <p>活動名稱: {item.name}</p>
              <p>開始時間: {item.start}</p>
              <p>結束時間: {item.end}</p>
              <p>使用分區: {item.area}</p>
              <p>活動代表: {item.apply}</p>
              <p>指導老師: {item.teacher}</p>
              <p>場地狀態: {item.status}</p>
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
