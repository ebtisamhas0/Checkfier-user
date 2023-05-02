import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../components/StoreContext';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import '../App.css';
import { UserContext } from '../components/UserContext';

export function Login() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { store } = useStore();
  
  const handleOnNavigate = () => navigate('/Rewards1');
  const handleSignup = () => navigate("/")
  const { login } = useContext(UserContext);
   
  const handleLogin = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });
      const { phone: userPhone, points } = await response.json();
      alert(`Logged in successfully as ${userPhone}, your points is: ${points}`);
      login(userPhone, points);
      handleOnNavigate();
    } catch (error) {
      console.error(error);
      setError('An error occurred. Please try again later.' + error);
    }
  };

  if (!store.logo || !store.name) {
    return <p>Loading...</p>;
  }

  return (
    <div className='Container' style={{backgroundColor:store.color}}>
      <div>
        <img className='logo' src={store.logo} alt={store.name} style={{ width: 150, height: 150 }} />
        <h3 className='txt1'>Welcome To {store.name} CheckIn </h3>
        <h5 className='txt2'>Login To Your Account!</h5>
        <form onSubmit={handleLogin}>
          {error && alert(error)}
          <input
            className='inputBox'
            type={'text'}
            placeholder='05'
            minLength={10}
            maxLength={10}
            required={true}
            value={phone}
            onChange={(event) => {
              setPhone(event.target.value);
            }}
          />
          <h5 style={{ opacity: 0.5 }} onClick={handleSignup}>Don't hava an account? signup</h5>
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
