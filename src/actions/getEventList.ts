"use server";
import db from "@/utils/firestore";
import { collection, getDocs } from "firebase/firestore";
import { getSession } from "./auth";

interface Member {
  name: string;
}

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
  remark: string;
  members: Member[];
}

export const getEventList = async (): Promise<Item[] | { message: string }> => {
  const session = await getSession();
  
  if (!session || !session.user?.email?.endsWith("@gmail.com")) {
    return { message: "權限不足" };
  }

  const querySnapshot = await getDocs(collection(db, "activity"));
  const itemsData = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    const members: Member[] =
      data.members?.map((member: { name: string }) => ({
        name: member.name,
      })) || [];
    return { ...data, id: doc.id, members } as Item;
  });

  return itemsData;
};
