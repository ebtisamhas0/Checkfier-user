import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useStore } from '../components/StoreContext';
import { UserContext } from '../components/UserContext';
import { LanguageContext } from '../components/LanguageContext';
import rewardsTranslations from '../translations/rewards';
import { serverUrl } from '../config';
import { BsFillArrowRightCircleFill, BsFillXCircleFill } from 'react-icons/bs';

export function UpdatePhonePopup({ userPhone, onClose }) {
  const [newPhone, setNewPhone] = useState(''); // State for the new phone number input
  const [error, setError] = useState(null); // State for any errors during the update operation
  const {store} = useStore();
  const { setUserPhone } = useContext(UserContext);
  const { language } = useContext(LanguageContext);
  const translations = rewardsTranslations[language];
  
  // Function to update the user's phone number
  function updatePhoneNumber() {
    axios.patch(`${serverUrl}/changeNumber`, { phone: userPhone, newPhone })
      .then(response => {
        const updatedUser = response.data; 
        console.log(updatedUser.phone); 
        alert(`${translations.success} ${updatedUser.phone}`);
        setNewPhone('');
        setUserPhone(newPhone);
        setError(null); 
        onClose(); 
      })
      .catch(error => {
        console.error(error.message);
        setError(`${translations.failed}`); // Set the error state
      });
  }

  return (
    <div className="popup" style={{color:store.color,
    backgroundColor:'#FFFCF1',
    height:300,position:'absolute',
    top:220,width:300,
    padding:10, left:50}}>
      <div className="popup-content">
      <BsFillXCircleFill className="close-icon" onClick={onClose} />
        <h2 style={{marginTop: 35}}>{translations. updatePhone}</h2>
        <form onSubmit={(event) => { event.preventDefault(); updatePhoneNumber(); }}>
          <label htmlFor="new-phone" style={{fontSize:20,marginTop:22}}>{translations.newNumber}</label>
          <input type="text" id="new-phone" name="new-phone" value={newPhone} onChange={(event) => setNewPhone(event.target.value)} 
          style={{width:'30vh'}}/>
          <br/><br/>
          <button type="submit" style={{ backgroundColor: 'rgba(0,0,0,0.0)', border: 'none', color:store.color, marginTop:15 }}>
          <BsFillArrowRightCircleFill size={30} />

          </button>
        </form>
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
}
