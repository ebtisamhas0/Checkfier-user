import React from 'react';

export const LanguageContext = React.createContext({
  language: 'ar',
  setLanguage: () => {},
});

export const useLanguage = () => {
  const { language, setLanguage } = React.useContext(LanguageContext);
  return { language, setLanguage };
};
