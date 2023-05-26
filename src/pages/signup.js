import React, { useState, useContext } from 'react';
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { useStore } from '../components/StoreContext';
import { LanguageContext } from '../components/LanguageContext';
import signupTranslations from '../translations/signup';

export function Signup() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(null);
  const { store } = useStore();
  const { translations, language } = useContext(LanguageContext);
  const signupTranslationsData = signupTranslations[language];

  const navigate = useNavigate();
  const handleOnNavigate = () => navigate("/Rewards1");
  const handleOnLogin = () => navigate("/Login");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phone })
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error);
      } else {
        console.log(data);
        handleOnNavigate();
      }
    } catch (error) {
      console.error(error);
      setError(signupTranslationsData.errorOccurred);
    }
  };

  return (
    <div className="Container" style={{ backgroundColor: store.color }}>
      <div>
        <img className='logo' src={store.logo} style={{ width: 150, height: 150 }} />
        <h3 className='txt1'>{translations.welcomeTo} {store.name} {translations.CheckIn}</h3>
        <h5 className='txt2'>{translations.typeNumber}</h5>
        <form onSubmit={handleSubmit}>
          {error && alert(error)}
          <input className='inputBox' type={'text'}
            placeholder={translations.phonePlaceholder} minLength={10} maxLength={10} required={true}
            value={phone}
            onChange={(event) => {
              setPhone(event.target.value);
            }}
          />
          <h5 style={{ opacity: 0.5 }} onClick={handleOnLogin}>{translations.alreadyHaveAccount}</h5>
          <div>
            <button type='submit' style={{ backgroundColor: 'rgba(0,0,0,0.0)', border: 'none', color: '#FFFCF1' }}>
              <BsFillArrowRightCircleFill size={30} >
              </BsFillArrowRightCircleFill>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


