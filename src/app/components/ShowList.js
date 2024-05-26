"use client"
import { useEffect, useState } from "react"
import db from "../../utils/firestore"
import { collection, getDocs } from "firebase/firestore"

const ListItems = () => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const fetchItems = async () => {
      const querySnapshot = await getDocs(collection(db, "activity"))
      setItems(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }

    fetchItems()
  }, [])

  return (
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
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ListItems