"use client"

import { useEffect, useState } from "react"
import db from "../../utils/firestore"
import { collection, getDocs } from "firebase/firestore"
import DeleteItem from "./DeleteItem.js"

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
      <h2>List of Items</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id} className="border-t-2 p-2">
            <p>{item.name}</p>
            <DeleteItem id={item.id} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ListItems