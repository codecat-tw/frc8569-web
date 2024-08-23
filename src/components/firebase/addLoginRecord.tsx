"use client";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import db from "../../utils/firestore";

const addLoginRecord = async (email: string): Promise<void> => {
  try {
    await updateDoc(doc(db, "users", email), {
      email,
      loginTime: new Date(),
    });
    console.log("Login record added successfully.");
  } catch (error) {
    console.error("Error adding login record: ", error);
  }
};

export default addLoginRecord;