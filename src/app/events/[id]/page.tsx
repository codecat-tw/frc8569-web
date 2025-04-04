import { notFound } from "next/navigation";
import db from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { joinEvent } from "@/actions/activity";
import { Activity } from "@/types/activity";
import ActivityCard from "@/components/ActivityCard";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ join?: string }>;
}) {
  const { id } = await params;
  const { join } = await searchParams;

  if (!id) {
    return notFound();
  }

  const decodedId = decodeURIComponent(id);
  const docRef = doc(db, "activity", decodedId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return notFound();
  }

  const eventData = docSnap.data() as Activity;
  let resultMessage: string | null = null;

  if (join === "1") {
    resultMessage = await joinEvent(decodedId);
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
