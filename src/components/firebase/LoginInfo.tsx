"use client";
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import db from "../../utils/firestore"
import { doc, setDoc } from 'firebase/firestore';

const FirebaseLoginTracker = () => {
    const { data: session } = useSession();

    useEffect(() => {
        if (session) {
            const email = session.user?.email || 'ErrorUser';
            const addLoginRecord = async () => {
                try {
                    await setDoc(doc(db, 'users', email), {
                        email: session.user?.email,
                        loginTime: new Date()
                    });
                    console.log("setDoc");
                } catch (error) {
                    console.error("Error adding login record: ", error);
                }
            };
            addLoginRecord();
        }
    }, [session]);

    return null;
};

export default FirebaseLoginTracker;
