import { collection, setDoc, doc } from "firebase/firestore";
import db from "../../utils/firestore";

interface FormValues {
  date: string;
  name: string;
  start: string;
  end: string;
  area: string;
  teacher: string;
}

interface AddItemProps {
  formValues: FormValues;
  userEmail: string;
  userName: string;
}

const ApplyItem = async ({
  formValues,
  userEmail,
  userName,
}: AddItemProps): Promise<string> => {
  const { date, name, start, end, area, teacher } = formValues;
  if (date && name && start && end && area && teacher) {
    try {
      const applyTime = new Date().toISOString();
      const docRef = doc(collection(db, "activity"), applyTime);
      await setDoc(docRef, {
        ...formValues,
        applyEmail: userEmail,
        applyName: userName,
        status: "尚未審核",
        remark: "(沒有評語)",
      });
      console.log("setDoc");
      return applyTime;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  } else {
    console.log("All fields are required.");
  }
  return "applyerror";
};

export default ApplyItem;
