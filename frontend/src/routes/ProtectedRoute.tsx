import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { checkAuth } from "../store/authSlice";

const ProtectedRoute: React.FC = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch<AppDispatch>();
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!token) {
      setIsValid(false);
      return;
    }
    if( user) {
      setIsValid(true);
      return;
    }
    dispatch(checkAuth())
      .unwrap()
      .then(() => setIsValid(true))
      .catch(() => setIsValid(false));
  }, [dispatch, token]);

  if (isValid === null) {
    return <div>Checking authentication...</div>;
  }

  if (!token || isValid === false) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
