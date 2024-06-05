import React, { useState } from "react";
import db from '../utils/firestore';
import { doc, getDoc, setDoc } from "firebase/firestore";

interface JoinButtonProps {
  id: string;
  userEmail: string;
  userName: string;
}

const JoinButton: React.FC<JoinButtonProps> = ({ id, userEmail, userName }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const addUserToFirebase = async () => {
    setLoading(true);
    const docRef = doc(db, "activity", id);

    try {
      const docSnap = await getDoc(docRef);
      let members = docSnap.exists() ? (docSnap.data()?.members as { name: string; email: string; createdAt: Date }[] || []) : [];

      if (members.some(member => member.email === userEmail)) {
        setMessage(`你已報名過了`);
      } else {
        const newMember = {
          name: userName,
          email: userEmail,
          createdAt: new Date()
        };
        members.push(newMember);

        await setDoc(docRef, { members }, { merge: true });
        setMessage(`你已成功報名`);
      }
    } catch (e) {
      console.error("添加使用者失敗: ", e);
      setMessage("添加使用者失敗");
    }

    setLoading(false);
  };

  return (
    <>
      <button
        onClick={addUserToFirebase}
        disabled={loading}
        className="border bg-orange-400 p-1 rounded text-white"
      >
        {loading ? "添加中..." : "報名活動"}
      </button>
      {message && <p>{message}</p>}
    </>
  );
}

export default JoinButton;
