import { useEffect, useState } from "react";
import db from "../../utils/firestore";
import { collection, getDocs, DocumentData } from "firebase/firestore";

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
  members: Member[]; // 修改 members 屬性類型
}

const GetEventList = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const querySnapshot = await getDocs(collection(db, "activity"));
      const itemsData = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const data = doc.data() as DocumentData;
          const members: Member[] = data.members?.map((member: { name: string }) => ({ name: member.name })) || [];
          return { ...data, id: doc.id, members } as Item;
        })
      );
      setItems(itemsData);
    };

    fetchItems();
  }, []);

  return items;
};

export default GetEventList;