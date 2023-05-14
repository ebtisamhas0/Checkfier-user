import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useStore } from '../components/StoreContext';
import { UserContext } from '../components/UserContext';
import {  AiOutlineRight, AiOutlineInfoCircle, AiOutlineQuestionCircle, AiOutlinePhone } from "react-icons/ai";
import {FaGratipay} from 'react-icons/fa'
import '../App.css';
import {UpdatePhonePopup} from './UpdatePhonePopup';
import {RateUsPopup} from "./RateUsPopup";

export function Settings() {
  const navigate = useNavigate();
  const { store } = useStore();
  const { userPhone } = useContext(UserContext);
  const [showRateUsPopup, setShowRateUsPopup] = useState(false); // State for showing or hiding the Rate Us popup
  const [showUpdatePhonePopup, setShowUpdatePhonePopup] = useState(false); // State for showing or hiding the Update Phone popup

  const handleAboutNavigate = () => navigate("/About");
  const handleHelpNavigate = () => navigate("/Help");

  const handleChangeNavigate = () => setShowUpdatePhonePopup(true); // Set the state to true to show the Update Phone popup
   

  const handleRateUsPopupSubmit = ({ rating, comment, phone }) => {
    // Send API request to server to submit rating and feedback data
    console.log(`Rating: ${rating}, Comment: ${comment}, Phone: ${phone}`);
    setShowRateUsPopup(false);
    navigate('/settings');
  };

  return (
    <div className="Container" style={{ backgroundColor: store.color }}>
      <img className='avatar' src={require('../images/user.png')} height='128vh'></img>
      <hr style={{ width: '90%' }} />
      <div className='settings-main'>
        <div className='section d-flex'>
          <AiOutlineInfoCircle style={{ marginTop: 8 }} />
          <h4 style={{ marginTop: 8 }}>About</h4>
          <AiOutlineRight onClick={handleAboutNavigate} style={{ marginTop: 8 }} />
        </div>
        <div className='section d-flex'>
          <AiOutlineQuestionCircle style={{ marginTop: 8 }} />
          <h4 style={{ marginTop: 8 }}>Help centre</h4>
          <AiOutlineRight onClick={handleHelpNavigate} style={{ marginTop: 8 }} />
        </div>

        <div className='section d-flex'>
          <FaGratipay style={{ marginTop: 8 }} />
          <h4 style={{ marginTop: 8 }}>Rate US</h4>
          <AiOutlineRight 
            onClick={() => setShowRateUsPopup(true)}
            style={{ marginTop: 8 }}
          />
          {showRateUsPopup && <RateUsPopup isOpen={true} onClose={() => setShowRateUsPopup(false)} onSubmit={handleRateUsPopupSubmit} initialPhone={userPhone} />}
        </div>

        <div className='section-phone  d-flex'>
          <AiOutlinePhone style={{ marginTop: 8 }} />
          <h4 className='phone-num' style={{ marginTop: 8 }}>Phone: {userPhone}</h4>
          <label ></label>
        </div>
          <button style={{ opacity: 0.7, backgroundColor: 'rgba(0,0,0,0.0)', border: 'none', color: '#FFFCF1',fontSize:22 }}onClick={handleChangeNavigate} >Change phone number?</button>
      </div>
          {showUpdatePhonePopup && <UpdatePhonePopup userPhone={userPhone} isOpen={true} onClose={() => setShowUpdatePhonePopup(false)} initialPhone={userPhone} />}
          
        </div>
        
  );
}


