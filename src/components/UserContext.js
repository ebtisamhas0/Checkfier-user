import React, { createContext, useState, useEffect } from 'react';
import { setCookie } from 'react-use-cookie';

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [userPhone, setUserPhone] = useState(null);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const userCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('user='));
    if (userCookie) {
      const { phone, points } = JSON.parse(userCookie.split('=')[1]);
      setUserPhone(phone);
      setPoints(points);
    }
  }, []);

  useEffect(() => {
    if (userPhone && points) {
      setCookie('user', JSON.stringify({ phone: userPhone, points }), {
        httpOnly: true,
        secure: true,
        path: '/',
        maxAge: 604800000 // 7 days in milliseconds
      });
    }
  }, [userPhone, points]);

  const login = (phone, points) => {
    setUserPhone(phone);
    setPoints(points);
  };

  const userContextValue = {
    userPhone,
    points,
    setPoints,
    setUserPhone,
    login,
  };

  return (
    <UserContext.Provider value={userContextValue}>
      {children}

    </UserContext.Provider>
  );
};

