import { notFound } from "next/navigation";
import clientPromise from "@/lib/mongodb";
import { joinEvent } from "@/actions/activity";
import { Activity } from "@/types/activity";
import ActivityCard from "@/components/ActivityCard";
import { ObjectId } from "mongodb";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ join?: string }>;
}) {
  const { id } = await params;
  const { join } = await searchParams;

  if (!id) return notFound();

  const decodedId = decodeURIComponent(id);
  const client = await clientPromise;
  const db = client.db();
  const eventData = await db
    .collection("activity")
    .findOne({ _id: new ObjectId(decodedId) });

  if (!eventData) return notFound();

  const resultMessage = join === "1" ? await joinEvent(decodedId) : null;

  const activity: Activity = {
    ...eventData,
    id: eventData._id.toString(),
  } as unknown as Activity;

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md rounded-lg border border-gray-300 bg-white p-8">
        <ActivityCard activity={activity} />
        {resultMessage && (
          <div className="rounded-md border border-green-500 bg-green-100 p-4 text-center text-lg font-semibold text-green-700">
            {resultMessage}
          </div>
        )}
      </div>
    </div>
  );
}
