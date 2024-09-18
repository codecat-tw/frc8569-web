import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "next/navigation";
import db from "../../utils/firestore";

interface IUser {
  email: string;
  name: string;
  image: string;
  team: string;
  lastLogin: string;
}

export const SearchUser = () => {
  const params = useParams();
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (!params || !params.id || Array.isArray(params.id)) {
        setUser(null);
        setLoading(false);
        return;
      }

      const decodedId = decodeURIComponent(params.id);
      const userDocRef = doc(db, "users", decodedId);
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
  }, [params]);

  console.log(user);

  return { user, loading };
};

export default SearchUser;
