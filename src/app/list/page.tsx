'use client';

import { useSession } from 'next-auth/react';
import GetEventList from "../components/GetEventList";
import NoPurview from "../components/NoPurview";
import JoinButton from '../components/JoinButton';

const List: React.FC = () => {
  const { data: session } = useSession();
  const items = GetEventList();
  const userEmail = session?.user?.email || 'ErrorUser';

  if (!session || !userEmail.endsWith('@mail2.chshs.ntpc.edu.tw')) {
    return <NoPurview />;
  }

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-6">活動清單</h1>
      <div className="bg-white shadow-lg rounded-lg border w-96 text-center p-4">
        <ul className="divide-y divide-gray-200">
          {items.map((item) => (
            <li key={item.id} className="p-4">
              <p className="text-gray-700 font-semibold">活動日期: <span className="font-normal">{item.date}</span></p>
              <p className="text-gray-700 font-semibold">活動名稱: <span className="font-normal">{item.name}</span></p>
              <p className="text-gray-700 font-semibold">開始時間: <span className="font-normal">{item.start}</span></p>
              <p className="text-gray-700 font-semibold">結束時間: <span className="font-normal">{item.end}</span></p>
              <p className="text-gray-700 font-semibold">使用分區: <span className="font-normal">{item.area}</span></p>
              <p className="text-gray-700 font-semibold">活動代表: <span className="font-normal">{item.apply}</span></p>
              <p className="text-gray-700 font-semibold">指導老師: <span className="font-normal">{item.teacher}</span></p>
              <p className="text-gray-700 font-semibold">場地狀態: <span className="font-normal">{item.status}</span></p>
              <div className="mt-4">
                <JoinButton id={item.id} userEmail={userEmail} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default List;
