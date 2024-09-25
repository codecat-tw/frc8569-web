"use client";
import React, { useState, FormEvent } from "react";
import { updateRemark } from "@/actions/updateRemark";

interface RemarkProps {
  id: string;
}

const RemarkUpdate: React.FC<RemarkProps> = ({ id }) => {
  const [remark, setRemark] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  
    if (window.confirm("你確定要傳送活動評語嗎?")) {
      try {
        await updateRemark(id, remark);
        alert("已傳送活動評語");
      } catch (error) {
        if (error instanceof Error) {
          alert("傳送評語失敗: " + error.message);
        } else {
          alert("傳送評語失敗，未知錯誤");
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={remark}
        onChange={(e) => setRemark(e.target.value)}
        placeholder="輸入備註"
        className="mb-2 rounded border p-1"
      />
      <button
        type="submit"
        className="rounded border bg-gray-400 p-1 text-white"
      >
        傳送評語
      </button>
    </form>
  );
};

export default RemarkUpdate;
