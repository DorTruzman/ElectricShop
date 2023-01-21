import { auth, db } from "../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { query, collection, getDocs, where } from "firebase/firestore";

function useName() {
  const [user] = useAuthState(auth);
  const [name, setName] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const fetchName = async () => {
      try {
        const q = query(collection(db, "users"), where("uid", "==", user?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        setName(data.name);
      } catch (err) {
        setError(error);
      }
    };

    fetchName();
  }, [error, user]);

  return { name, error };
}

export default useName;
