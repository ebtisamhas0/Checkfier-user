import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../components/StoreContext';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import '../App.css';
import { UserContext } from '../components/UserContext';
import { useLanguage } from '../components/LanguageContext';
import loginTranslations from '../translations/login';
export function Login() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { store } = useStore();
  const { login } = useContext(UserContext);
  const { language } = useLanguage();
  const translations = loginTranslations[language];


  const handleOnNavigate = () => navigate('/Rewards1');
  const handleSignup = () => navigate('/');

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });
      const { phone: userPhone, points } = await response.json();
      alert(`${translations.loginSuccess} ${userPhone}, ${translations.yourPointsIs}: ${points}`);
      login(userPhone, points);
      // Set cookie with user's phone number and points
      const expirationTime = new Date(Date.now() + 2 * 60 * 60 * 1000); // current time + 2 hours in milliseconds
      document.cookie = `phone=${userPhone}; points=${points}; expires=${expirationTime.toUTCString()}`;
      handleOnNavigate();
    } catch (error) {
      console.error(error);
      setError(`${translations.errorOccurred} ${error}`);
    }
  };

  if (!store.logo || !store.name) {
    return <p>{translations.loading}</p>;
  }

  return (
    <div className='Container' style={{backgroundColor:store.color}}>
      <div>
        <img className='logo' src={store.logo} alt={store.name} style={{ width: 150, height: 150 }} />
        <h3 className='txt1'>{translations.welcomeTo} {store.name} {translations.checkIn}</h3>
        <h5 className='txt2'>{translations.loginTo} {translations.yourAccount}!</h5>
        <form onSubmit={handleLogin}>
          {error && alert(error)}
          <input
            className='inputBox'
            type={'text'}
            placeholder={translations.phonePlaceholder}
            minLength={10}
            maxLength={10}
            required={true}
            value={phone}
            onChange={(event) => {
              setPhone(event.target.value);
            }}
          />
          <h5 style={{ opacity: 0.5 }} onClick={handleSignup}>{translations.dontHaveAnAccount} {translations.signup}</h5>
          <div>
            <button type='submit' style={{ backgroundColor: 'rgba(0,0,0,0.0)', border: 'none', color: '#FFFCF1' }}>
              <BsFillArrowRightCircleFill size={30} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
