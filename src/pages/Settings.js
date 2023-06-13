import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useStore } from '../components/StoreContext';
import { UserContext } from '../components/UserContext';
import {  AiOutlineRight, AiOutlineInfoCircle, AiOutlineQuestionCircle, AiOutlinePhone } from "react-icons/ai";
import {FaGratipay} from 'react-icons/fa'
import '../App.css';
import {UpdatePhonePopup} from './UpdatePhonePopup';
import {RateUsPopup} from "./RateUsPopup";
import { LanguageContext } from '../components/LanguageContext';
import rewardsTranslations from '../translations/rewards';
import LanguageSelector from '../components/LanguageSelector';


export function Settings() {
  const navigate = useNavigate();
  const { store } = useStore();
  const { userPhone } = useContext(UserContext);
  const [showRateUsPopup, setShowRateUsPopup] = useState(false); // State for showing or hiding the Rate Us popup
  const [showUpdatePhonePopup, setShowUpdatePhonePopup] = useState(false); // State for showing or hiding the Update Phone popup
  const { language } = useContext(LanguageContext);
  const translations = rewardsTranslations[language];

  
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
       <LanguageSelector />
      <img className='avatar' src={require('../images/user.png')} height='128vh'></img>
      <hr style={{ width: '90%' }} />
      <div className='settings-main'>
        <div className='section d-flex'>
          <AiOutlineInfoCircle style={{ marginTop: 8,color:store.color }} />
          <h4 style={{ marginTop: 8 ,color:store.color}}>{translations.about}</h4>
          <AiOutlineRight onClick={handleAboutNavigate} style={{ marginTop: 8,color:store.color }} />
        </div>
        <div className='section d-flex'>
          <AiOutlineQuestionCircle style={{ marginTop: 8,color:store.color }} />
          <h4 style={{ marginTop: 8,color:store.color }}>{translations.helpCentre}</h4>
          <AiOutlineRight onClick={handleHelpNavigate} style={{ marginTop: 8,color:store.color }} />
        </div>

        <div className='section d-flex'>
          <FaGratipay style={{ marginTop: 8,color:store.color }} />
          <h4 style={{ marginTop: 8 ,color:store.color}}>{translations.rating}</h4>
          <AiOutlineRight 
            onClick={() => setShowRateUsPopup(true)}
            style={{ marginTop: 8,color:store.color }}
          />
          {showRateUsPopup && <RateUsPopup isOpen={true} onClose={() => setShowRateUsPopup(false)} onSubmit={handleRateUsPopupSubmit} initialPhone={userPhone} />}
        </div>

        <div className='section-phone  d-flex'>
          <AiOutlinePhone style={{ marginTop: 8,color:store.color }} />
          <h4 className='phone-num' style={{ marginTop: 8 ,color:store.color}}>{translations.phone} {userPhone}</h4>
          <label ></label>
        </div>
          <button style={{ opacity: 0.7, backgroundColor: 'rgba(0,0,0,0.0)', border: 'none', color: '#FFFCF1',fontSize:22 }}onClick={handleChangeNavigate} >{translations.Changephone}</button>
      </div>
          {showUpdatePhonePopup && <UpdatePhonePopup userPhone={userPhone} isOpen={true} onClose={() => setShowUpdatePhonePopup(false)} initialPhone={userPhone} />}
          
        </div>
        
  );
}


