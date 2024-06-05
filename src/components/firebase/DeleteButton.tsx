import React from "react";
import db from "../../utils/firestore";
import { doc, deleteDoc } from "firebase/firestore";

interface DeleteItemProps {
  id: string;
}

const DeleteItem: React.FC<DeleteItemProps> = ({ id }) => {
  const handleDelete = async () => {
    const itemRef = doc(db, "activity", id);
    try {
      await deleteDoc(itemRef);
      alert("Item deleted successfully");
    } catch (error) {
      console.error("Error deleting document: ", error);
      alert("Error deleting item");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="border bg-red-400 p-1 rounded text-white"
    >
      刪除項目
    </button>
  );
}

export default DeleteItem;
