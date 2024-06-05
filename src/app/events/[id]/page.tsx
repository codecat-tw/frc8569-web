"use client";
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import db from "../../../utils/firestore";
import { joinEvent } from "../../../components/firebase/JoinEvent";
import { useSession } from 'next-auth/react';

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
}

const EventsPage = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const [eventData, setEventData] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [joinExecuted, setJoinExecuted] = useState(false);
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email || 'ErrorUser';
  const userName = session?.user?.name || 'ErrorUser';

  useEffect(() => {
    const fetchEventData = async () => {
      if (!params || !params.id || Array.isArray(params.id)) {
        setLoading(false);
        setError('無效的參數');
        return;
      }

      try {
        const docRef = doc(db, 'activity', params.id as string);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setEventData(docSnap.data() as Item);
        } else {
          setError('活動未找到');
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
        setError('獲取資料時出錯');
      } finally {
        setLoading(false);
      }

      if (!joinExecuted) {
        const joinParam = searchParams?.get('join') || '-';
        console.log("Join parameter:", joinParam); // log join parameter

        if (joinParam === '1') {
          console.log("Calling joinEvent with ID:", params.id); // log before calling joinEvent
          const resultMessage = await joinEvent(params.id as string, userEmail, userName);
          console.log("joinEvent result:", resultMessage); // log result of joinEvent
          setJoinExecuted(true);
        }
      }
    };

    fetchEventData();
  }, [params, searchParams, userEmail, userName, joinExecuted]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-100">載入中...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-100">{error}</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div>
        <h1 className="text-2xl font-bold mb-4">{eventData?.name}</h1>
        <p>日期: {eventData?.date}</p>
        <p>開始時間: {eventData?.start}</p>
        <p>結束時間: {eventData?.end}</p>
        <p>地點: {eventData?.area}</p>
        <p>申請者電子郵件: {eventData?.applyEmail}</p>
        <p>申請者姓名: {eventData?.applyName}</p>
        <p>教師: {eventData?.teacher}</p>
        <p>狀態: {eventData?.status}</p>
      </div>
    </div>
  );
};

export default EventsPage;
