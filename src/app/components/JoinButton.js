// pages/index.js
import { useState } from "react";
import db from '../../utils/firestore';
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function JoinButton({ id, userEmail }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [userCount, setUserCount] = useState(1); // 用於生成唯一的使用者資訊

  const addUserToFirebase = async () => {
    setLoading(true);
    const docRef = doc(db, "activity", id);
    try {
      const docSnap = await getDoc(docRef);
      let users = [];

      if (docSnap.exists()) {
        users = docSnap.data().users || [];
      }

      const newUser = {
        name: `User ${userCount}`,
        email: userEmail,
        createdAt: new Date(),
      };

      users.push(newUser);

      await setDoc(docRef, { users }, { merge: true });
      setMessage(`使用者 ${userCount} 已成功添加！`);
      setUserCount(userCount + 1); // 更新使用者計數
    } catch (e) {
      console.error("添加使用者失敗: ", e);
      setMessage("添加使用者失敗");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Firebase 使用者添加範例</h1>
      <button onClick={addUserToFirebase} disabled={loading}>
        {loading ? "添加中..." : "報名活動"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}
