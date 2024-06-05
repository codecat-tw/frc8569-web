import db from '../../utils/firestore';
import { doc, getDoc, setDoc } from "firebase/firestore";

export const joinEvent = async (id: string, userEmail: string, userName: string) => {
  const docRef = doc(db, "activity", id);

  try {
    const docSnap = await getDoc(docRef);
    let members = docSnap.exists() ? (docSnap.data()?.members as { name: string; email: string; createdAt: Date }[] || []) : [];

    if (members.some(member => member.email === userEmail)) {
      return `你已報名過了`;
    } else {
      const newMember = {
        name: userName,
        email: userEmail,
        createdAt: new Date()
      };
      members.push(newMember);

      await setDoc(docRef, { members }, { merge: true });
      return `你已成功報名`;
    }
  } catch (e) {
    console.error("添加使用者失敗: ", e);
    return "添加使用者失敗";
  }
};
