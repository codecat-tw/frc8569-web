import { useState } from 'react';
import { doc, updateDoc } from "firebase/firestore";
import db from '../../utils/firestore';

const UpdateStatusButton = ({ documentId }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleUpdateStatus = async () => {
        setLoading(true);
        setError(null);

        try {
            const docRef = doc(db, "activity", documentId);
            await updateDoc(docRef, {
                status: "申請通過"
            });
            console.log("場地狀態更新成功");
        } catch (e) {
            console.error("檔案更新錯誤: ", e);
            setError(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button onClick={handleUpdateStatus} disabled={loading}>
                {loading ? '更新中...' : '接受申請'}
            </button>
            {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
        </div>
    );
};

export default UpdateStatusButton;
