import React, { createContext, useState } from 'react';

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [userPhone, setUserPhone] = useState(null);
  const [points, setPoints] = useState(0);

  const login = (phone, points) => {
    setUserPhone(phone);
    setPoints(points);
  };

    const userContextValue = {
    userPhone,
    points,
    login,
  };

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};

