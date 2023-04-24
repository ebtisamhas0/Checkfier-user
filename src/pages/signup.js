import React, {useState} from 'react'
import '../App.css'
import {BsFillArrowRightCircleFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import {useStore} from '../StoreContext'
export function Signup() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(null);
  const { store } = useStore();


  const navigate = useNavigate()
   const handleOnNavigate = () => navigate("/Rewards1")
   const handleOnLogin = () => navigate("/Login")

   

 //submit data
   
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
      console.log(data)
      handleOnNavigate()
      // Handle successful registration
    }
  } catch (error) {
    console.error(error);
    setError('An error occurred. Please try again later.'+error);
  }
};


  
  return (
    <div className="Container" style={{backgroundColor:store.color}}>
    <div >
      <img className='logo' src={require('../images/logo.png')} style={{width:150, height:150}}/>
      <h3 className='txt1'>Welcome To Golden Brown CheckIn </h3>
      <h5 className='txt2'>Type your number to become our guest!</h5>
       <form onSubmit={handleSubmit}>
      {error && alert(error)}
      <input className='inputBox' type={'text'}
       placeholder='05' minLength={10} maxLength={10} required={true} 
       value={phone}
       onChange={(event) => {
         setPhone(event.target.value);
       }} 
      />
      <h5 style={{opacity:0.5}} onClick={handleOnLogin}>already have an account?</h5>
      <div>
      <button type='submit' style={{backgroundColor: 'rgba(0,0,0,0.0)', border: 'none',color: '#FFFCF1'}}>
      <BsFillArrowRightCircleFill size={30} >
      </BsFillArrowRightCircleFill>
      </button>
      
      </div>
      </form>

    </div>
    </div>
  )



  }
