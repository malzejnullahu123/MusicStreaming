import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../authContext/AuthContext";
import { removeUserCredentials } from '../axios/AxiosService';

export const Profile = () => {
  const { logout } = useAuth();
  const [redirect, setRedirect] = useState(false);

  const handleSignOut = () => {
    removeUserCredentials();
    logout();
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h1>Profile</h1>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};
