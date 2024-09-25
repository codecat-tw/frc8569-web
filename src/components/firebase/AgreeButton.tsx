"use client";
import React from "react";
import { approveActivity } from "@/actions/agreeAction";

interface AgreeButtonProps {
  id: string;
}

const AgreeButton: React.FC<AgreeButtonProps> = ({ id }) => {
  const handleUpdate = async () => {
    if (window.confirm("你確定要同意這個活動嗎？")) {
      try {
        await approveActivity(id);
        alert("已批准活動");
      } catch (error) {
        if (error instanceof Error) {
          alert("批准失敗: " + error.message);
        } else {
          alert("批准失敗，未知錯誤");
        }
      }
    }
  };

  return (
    <div>
      <button
        onClick={handleUpdate}
        className="rounded border bg-green-400 p-1 text-white"
      >
        接受申請
      </button>
    </div>
  );
};

export default AgreeButton;
