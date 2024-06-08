import React from "react";
import db from "../../utils/firestore";
import { doc, deleteDoc } from "firebase/firestore";

interface DeleteItemProps {
  id: string;
}

const DeleteItem: React.FC<DeleteItemProps> = ({ id }) => {
  const handleDelete = async () => {
    if (window.confirm("你確定要刪除這個活動嗎？")) {
      const itemRef = doc(db, "activity", id);
      try {
        await deleteDoc(itemRef);
        console.log("deleteDoc");
        alert("活動成功刪除");
      } catch (error) {
        console.error("刪除文件時出錯：", error);
        alert("刪除執行出現異常");
      }
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
