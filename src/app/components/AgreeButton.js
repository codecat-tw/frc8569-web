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
                status: 1
            });
            console.log("Document updated successfully");
        } catch (e) {
            console.error("Error updating document: ", e);
            setError(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button onClick={handleUpdateStatus} disabled={loading}>
                {loading ? 'Updating...' : 'Update Status'}
            </button>
            {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
        </div>
    );
};

export default UpdateStatusButton;
