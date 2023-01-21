import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
  }, [user, loading]);

  return <>{user ? children : null}</>;
};

export default ProtectedRoute;
