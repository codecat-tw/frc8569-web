import React, { useState } from 'react';
import { doc, updateDoc } from "firebase/firestore";
import db from '../../utils/firestore';

interface AgreeButtonProps {
  id: string;
}

const AgreeButton: React.FC<AgreeButtonProps> = ({ id }) => {
    const handleUpdateStatus = async () => {
        if (window.confirm("你確定要同意這個活動嗎？")) {
            const docRef = doc(db, "activity", id);
            try {
                await updateDoc(docRef, {
                    status: "申請通過"
                });
                alert("已批准活動");
            } catch (e) {
                console.error("檔案更新錯誤: ", e);
                alert("批准執行出現異常");
            }
        }
    };

    return (
        <div>
            <button 
                onClick={handleUpdateStatus}
                className="border bg-green-400 p-1 rounded text-white"
            >
                接受申請
            </button>
        </div>
    );
};

export default AgreeButton;
