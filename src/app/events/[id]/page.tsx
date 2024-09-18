"use client";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import db from "../../../utils/firestore";
import { joinEvent } from "@/components/firebase/JoinEvent";
import { useSession } from "next-auth/react";

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
  const params = useParams() || {};
  const searchParams = useSearchParams();
  const [eventData, setEventData] = useState<Item | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [joinExecuted, setJoinExecuted] = useState(false);
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const { data: session } = useSession();
  const userEmail = session?.user?.email || "ErrorUser";
  const userName = session?.user?.name || "ErrorUser";

  useEffect(() => {
    console.log("fetchEventData useEffect");
    const fetchEventData = async () => {
      if (!params.id || Array.isArray(params.id)) {
        setError("無效的參數");
        return;
      }

      const decodedId = decodeURIComponent(params.id);

      try {
        const docRef = doc(db, "activity", decodedId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setEventData(docSnap.data() as Item);
        } else {
          setError("活動未找到");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
        setError("獲取資料時出錯");
      }
    };

    fetchEventData();
  }, [params.id]);

  useEffect(() => {
    console.log("executeJoinEvent useEffect");
    const executeJoinEvent = async () => {
      if (!joinExecuted) {
        const joinParam = searchParams?.get("join") || "-";
        console.log("Join parameter:", joinParam);

        if (joinParam === "1") {
          if (!params.id || Array.isArray(params.id)) {
            setError("無效的參數");
            return;
          }

          const decodedId = decodeURIComponent(params.id);
          console.log("Calling joinEvent with ID:", decodedId);
          if (userEmail !== "ErrorUser" && userName !== "ErrorUser") {
            const resultMessage = await joinEvent(
              decodedId,
              userEmail,
              userName,
            );
            console.log("joinEvent result:", resultMessage);
            setResultMessage(resultMessage);
            setJoinExecuted(true);
          }
        }
      }
    };

    executeJoinEvent();
  }, [userEmail, userName]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        {error}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-3xl font-bold text-blue-600">
          {eventData?.name}
        </h1>
        <div className="space-y-4">
          <p className="text-lg">
            <span className="font-semibold">活動日期:</span> {eventData?.date}
          </p>
          <p className="text-lg">
            <span className="font-semibold">開始時間:</span> {eventData?.start}
          </p>
          <p className="text-lg">
            <span className="font-semibold">結束時間:</span> {eventData?.end}
          </p>
          <p className="text-lg">
            <span className="font-semibold">使用分區:</span> {eventData?.area}
          </p>
          <p className="text-lg">
            <span className="font-semibold">活動代表:</span>{" "}
            {eventData?.applyName}
          </p>
          <p className="text-lg">
            <span className="font-semibold">指導老師:</span>{" "}
            {eventData?.teacher}
          </p>
          <p className="text-lg">
            <span className="font-semibold">審核狀態:</span> {eventData?.status}
          </p>
          {resultMessage && (
            <div className="mt-6 rounded-md border border-green-500 bg-green-100 p-4 text-center text-lg font-semibold text-green-700">
              {resultMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
