// AuthCheck.js
import React from 'react';
import { Redirect } from 'react-router-dom';

const AuthCheck = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Redirect to="/" />;
  }

  return <>{children}</>;
};

export default AuthCheck;
