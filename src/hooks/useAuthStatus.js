import { useState, useEffect } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";

const useAuthStatus = () => {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setChecking(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, checking };
};

export default useAuthStatus;
