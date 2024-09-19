import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import db from "../../utils/firestore";

interface IUser {
  email: string;
  name: string;
  image: string;
  team: string;
  lastLogin: string;
}

interface LoadUserProps {
  userId: string;
}

export const LoadUser = ({ userId }: LoadUserProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) {
        setUser(null);
        setLoading(false);
        return;
      }

      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);

      console.log(userDoc);

      if (userDoc.exists()) {
        setUser(userDoc.data() as IUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    fetchUser();
  }, [userId]);

  console.log(user);

  return { user, loading };
};

export default LoadUser;
