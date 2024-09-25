"use client";
import React from "react";
import { deleteActivity } from "@/actions/deleteItem";

interface DeleteItemProps {
  id: string;
}

const DeleteItem: React.FC<DeleteItemProps> = ({ id }) => {
  const handleDelete = async () => {
    if (window.confirm("你確定要刪除這個活動嗎？")) {
      try {
        await deleteActivity(id);
        alert("活動成功刪除");
      } catch (error) {
        if (error instanceof Error) {
          alert(`刪除失敗: ${error.message}`);
        } else {
          alert("刪除失敗，未知錯誤");
        }
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="rounded border bg-red-400 p-1 text-white"
    >
      刪除項目
    </button>
  );
};

export default DeleteItem;
