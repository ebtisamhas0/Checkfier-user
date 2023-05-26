import React from 'react';

export const LanguageContext = React.createContext({
  language: 'en',
  setLanguage: () => {},
});

export const useLanguage = () => {
  const { language, setLanguage } = React.useContext(LanguageContext);
  return { language, setLanguage };
};
