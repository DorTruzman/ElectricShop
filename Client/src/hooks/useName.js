import { auth, getUserDisplayName } from "../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

function useName() {
  const [user] = useAuthState(auth);
  const [name, setName] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const fetchName = async () => {
      try {
        setName(await getUserDisplayName(user?.uid));
      } catch (err) {
        setError(error);
      }
    };

    fetchName();
  }, [error, user]);

  return { name, error };
}

export default useName;
