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
    <div className='min-h-screen bg-blue-100'>
      <h1>活動清單</h1>
      <div className="border w-96 text-center p-4">
        <ul>
          {items.map((item) => (
            <li key={item.id} className="border-t-2 p-2">
              <p>活動日期: {item.date}</p>
              <p>活動名稱: {item.name}</p>
              <p>開始時間: {item.start}</p>
              <p>結束時間: {item.end}</p>
              <p>使用分區: {item.area}</p>
              <p>活動代表: {item.apply}</p>
              <p>指導老師: {item.teacher}</p>
              <p>場地狀態: {item.status}</p>
              <JoinButton id={item.id} userEmail={userEmail} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default List;
