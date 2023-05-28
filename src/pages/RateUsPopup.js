import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import {HeartRating} from "../components/HeartRating";
import { useStore } from "../components/StoreContext";
import { UserContext } from '../components/UserContext';
import { useNavigate } from 'react-router-dom';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import { LanguageContext } from '../components/LanguageContext';
import helpTranslations from '../translations/help';
import { serverUrl } from '../config';

export function RateUsPopup({ isOpen, onClose, onSubmit, initialPhone }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [phone, setPhone] = useState(initialPhone);
  const {store} = useStore();
  const { userPhone, points, setPoints} = useContext(UserContext);
  const { language } = useContext(LanguageContext);
  const translations = helpTranslations[language];

  const navigate = useNavigate();
  console.log('Rating:', rating);
  console.log('Comment:', comment);

 


  const handleRateUsPopupSubmit = (event) => {
    event.preventDefault(); // prevent the default form submission behavior

    const currentDate = new Date().toISOString().slice(0, 10);
    fetch(`${serverUrl}/rate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        rating: rating,
        comment: comment,
        phone: userPhone ,
        date: currentDate, 
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Rating data submitted:', data);
      setRating(0); // reset the rating state variable to its initial value
      setComment(""); // reset the comment state variable to an empty string
      onSubmit({ rating, comment, phone });
      alert("Thank you for your feedback! you earned 15 points");
    })
    .catch(error => {
      console.error('Error submitting rating data:', error);
    });
  };


  
  
  
  
  
  
  return isOpen ? (
    <div className="rate-popup" style={{color:store.color,
        backgroundColor:'#FFFCF1',
        height:360,position:'absolute',
        top:220,width:300,
        padding:10,left:30,borderRadius: 8}}>
      <div className="popup-content">
        <button className="popup-close" onClick={onClose} style={{ backgroundColor: "transparent", border: "none", color: store.color, cursor: "pointer", float: "right", fontSize: "24px" }}>
          &times;
        </button>
        <h2 style={{ marginTop: "20px",marginBottom:28}}>{translations.rateUs}</h2>
        <form onSubmit={handleRateUsPopupSubmit}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px",fontSize:22 }}>
            <HeartRating rating={rating} onRatingChange={(value) => setRating(value)} />
            </div>

          <div style={{ marginBottom: "20px" }}>
            <textarea value={comment} onChange={(event) => setComment(event.target.value)} style={{ width: "100%", height: "80px", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />
          </div>
          
          
          <button type="submit" style={{ backgroundColor: 'rgba(0,0,0,0.0)', border: 'none', color:store.color, marginTop:35 }}>
          <BsFillArrowRightCircleFill size={30} />

          </button>
        </form>
      </div>
    </div>
  ) : null;
}

RateUsPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialPhone: PropTypes.string.isRequired,
};
