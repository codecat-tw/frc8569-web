"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import db from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { joinEvent } from "@/actions/activity";
import { Activity } from "@/types/activity";
import ActivityCard from "./ActivityCard";

export default function OneEvent() {
  const params = useParams() || {};
  const searchParams = useSearchParams();
  const [eventData, setEventData] = useState<Activity>();
  const [error, setError] = useState<string | null>(null);
  const [joinExecuted, setJoinExecuted] = useState(false);
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const { data: session } = useSession();
  const userEmail = session?.user?.email || "ErrorUser";
  const userName = session?.user?.name || "ErrorUser";

  useEffect(() => {
    const fetchEventData = async () => {
      if (!params.id || Array.isArray(params.id)) {
        setError("無效的參數");
        return;
      }

      const decodedId = decodeURIComponent(params.id);
      const docRef = doc(db, "activity", decodedId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setEventData(docSnap.data() as Activity);
      }
    };

    fetchEventData();
  }, [params.id]);

  useEffect(() => {
    const executeJoinEvent = async () => {
      if (!joinExecuted) {
        const joinParam = searchParams?.get("join") || "-";

        if (joinParam === "1") {
          if (!params.id || Array.isArray(params.id)) {
            setError("無效的參數");
            return;
          }

          const decodedId = decodeURIComponent(params.id);
          if (userEmail !== "ErrorUser" && userName !== "ErrorUser") {
            const resultMessage = await joinEvent(decodedId);
            setResultMessage(resultMessage);
            setJoinExecuted(true);
          }
        }
      }
    };

    executeJoinEvent();
  }, [userEmail, userName, joinExecuted, params.id, searchParams]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        {error}
      </div>
    );
  }

  if (!eventData) {
    return;
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <ActivityCard activity={eventData} />
        {resultMessage && (
          <div className="mt-6 rounded-md border border-green-500 bg-green-100 p-4 text-center text-lg font-semibold text-green-700">
            {resultMessage}
          </div>
        )}
      </div>
    </div>
  );
}
