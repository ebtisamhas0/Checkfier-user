import React, { useContext, useState, useEffect } from 'react';
import { LanguageContext } from './LanguageContext';
import loginTranslations from '../translations/login';
import signupTranslations from '../translations/signup';
import { defaultLanguage } from '../translations/login';
import aboutTranslations from '../translations/about';
import helpTranslations from '../translations/help';
import rewardsTranslations from '../translations/rewards';
import { useCookies } from 'react-cookie';

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(defaultLanguage);
  const [translationsData, setTranslationsData] = useState({
    ...loginTranslations[language],
    ...signupTranslations[language],
    ...aboutTranslations[language],
    ...helpTranslations[language],
    ...rewardsTranslations[language],
  });

  const [cookies, setCookie] = useCookies(['language']);

  useEffect(() => {
    const storedLanguage = cookies.language;
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, [cookies]);

  useEffect(() => {
    setTranslationsData({
      ...loginTranslations[language],
      ...signupTranslations[language],
      ...aboutTranslations[language],
      ...helpTranslations[language],
      ...rewardsTranslations[language],
    });

    // Update the dir attribute of the htmltag based on the current language value
    document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');

    setCookie('language', language, { path: '/' });
  }, [language, setCookie]);

  const value = {
    language,
    setLanguage,
    translations: translationsData,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;


