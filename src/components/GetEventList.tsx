// GetEventList.tsx
import { useEffect, useState } from "react";
import db from "../utils/firestore";
import { collection, getDocs } from "firebase/firestore";

interface Item {
  id: string;
  date: string;
  name: string;
  start: string;
  end: string;
  area: string;
  apply: string;
  teacher: string;
  status: string;
}

const GetEventList = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const querySnapshot = await getDocs(collection(db, "activity"));
      setItems(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Item)));
    };

    fetchItems();
  }, []);

  return items;
};

export default GetEventList;
