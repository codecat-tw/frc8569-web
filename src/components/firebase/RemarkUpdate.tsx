import React, { useState } from "react";
import db from "../../utils/firestore";
import { doc, updateDoc } from "firebase/firestore";

interface RemarkProps {
  id: string;
}

const RemarkUpdate: React.FC<RemarkProps> = ({ id }) => {
  const [remark, setRemark] = useState("");

  const remarkUpdate = async () => {
    if (window.confirm("你確定要傳送活動評語嗎?")) {
      const docRef = doc(db, "activity", id);
      try {
        await updateDoc(docRef, {
          status: "申請通過",
          remark: remark,
        });
        console.log("updateDoc");
        alert("已傳送活動評語");
      } catch (e) {
        console.error("檔案更新錯誤: ", e);
        alert("傳送評語執行異常");
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        value={remark}
        onChange={(e) => setRemark(e.target.value)}
        placeholder="輸入備註"
        className="mb-2 rounded border p-1"
      />
      <button
        onClick={remarkUpdate}
        className="rounded border bg-gray-400 p-1 text-white"
      >
        傳送評語
      </button>
    </div>
  );
};

export default RemarkUpdate;
