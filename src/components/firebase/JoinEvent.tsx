import db from "../../utils/firestore";
import { doc, getDoc, setDoc } from "firebase/firestore";

interface Member {
  name: string;
  email: string;
  createdAt: Date;
}

interface ActivityData {
  invite: string[];
  members: Member[];
}

export const joinEvent = async (
  id: string,
  userEmail: string,
  userName: string,
) => {
  const docRef = doc(db, "activity", id);

  try {
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return "活動不存在";
    }

    const activityData = docSnap.data() as ActivityData;
    const inviteList = activityData.invite || [];

    const isInvited = inviteList.some(
      (invite) =>
        invite === userEmail.split("@")[0] ||
        invite === userEmail.split("@")[1],
    );

    if (!isInvited) {
      return "你未被邀請參加";
    }

    let members = activityData.members || [];

    if (members.some((member) => member.email === userEmail)) {
      return `你已報名過了`;
    } else {
      const newMember: Member = {
        name: userName,
        email: userEmail,
        createdAt: new Date(),
      };
      members.push(newMember);

      await setDoc(docRef, { members }, { merge: true });
      console.log("setDoc");
      return `你已成功報名`;
    }
  } catch (e) {
    console.error("添加使用者失敗: ", e);
    return "添加使用者失敗";
  }
};
