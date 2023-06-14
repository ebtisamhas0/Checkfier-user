import React, { useState, useContext } from "react";
import '../App.css'
import { useStore } from "../components/StoreContext";
import { UserContext } from '../components/UserContext';
import { AiOutlineRight } from "react-icons/ai";
import { LanguageContext } from '../components/LanguageContext';
import helpTranslations from '../translations/help';
import { serverUrl } from '../config';

export function Help() {
  const { store } = useStore();
  const [question, setQuestion] = useState('');
  const { userPhone, setUserPhone } = useContext(UserContext);
  const [showPopup, setShowPopup] = useState(false);
  const [showSecondPopup, setShowSecondPopup] = useState(false);
  const [showThirdPopup, setShowThirdPopup] = useState(false);
  const [showFourthPopup, setShowFourthPopup] = useState(false);
  const { language } = useContext(LanguageContext);
  const translations = helpTranslations[language];


  const handleSubmit = async (event) => {
    event.preventDefault();
    const currentDate = new Date().toISOString().slice(0, 10);

    try {
      const response = await fetch(`${serverUrl}/questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          question,
          userPhone,
          date: currentDate,
          store: store.id
        })
      });
  
      if (!response.ok) {
        throw new Error('Error submitting question');
      }
  
      const result = await response.json();
      console.log('Question submitted successfully:', result);
      setQuestion('');
      setUserPhone('');
      alert('Your question has been submitted!');
    } catch (error) {
      console.error('Error submitting question:', error);
      alert('There was an error try again');
    }
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  }
  const secondPopup = () => {
    setShowSecondPopup(!showSecondPopup);
  }
  const thirdPopup = () => {
    setShowThirdPopup(!showThirdPopup);
  }
  const fourthPopup = () => {
    setShowFourthPopup(!showFourthPopup);
  }

  return (
    <div className="Container" style={{backgroundColor:store.color}}>
      <div className="help-main">
        <h2>{translations.title}</h2>

        <div className="questions-container">
          <h5 onClick={togglePopup} >{translations.gettingStarted}<AiOutlineRight style={{fontSize:15}}/></h5> 
          <h5 onClick={secondPopup}>{translations.createAccount}<AiOutlineRight style={{fontSize:15}}/> </h5> 
          <h5 onClick={thirdPopup}>{translations.getPoints}<AiOutlineRight style={{fontSize:15}}/> </h5> 
          <h5 onClick={fourthPopup}>{translations.changePhoneNumber}<AiOutlineRight style={{fontSize:15}}/> </h5> 
        </div>

        <div className="contact" style={{color:store.color}}>
          <h5>{translations.stillNeedHelp}</h5>
          <h6>{translations.sendQuestion} </h6>

          <form onSubmit={handleSubmit} className="contact-form">
            <input type="text" id="question" name="question" value={question} onChange={(event) => setQuestion(event.target.value)} required />
            <div className="contact-btn" style={{backgroundColor:store.color}}>
              <button type="submit">{translations.sendButton}</button>
            </div>
          </form>
          {showPopup ? (
            <div className="help-popup">
            <button onClick={togglePopup}>✖</button>
            <h3 className="about-txt"> {store.name}{translations.gettingStartedPopup}</h3>
            </div>
          ) : null}

         {showSecondPopup ? (
            <div className="help-popup">
            <button onClick={secondPopup}>✖</button>
            <h3 className="about-txt"> {translations.createAccountPopup}</h3>
            </div>
          ) : null} 

         {showThirdPopup ? (
            <div className="help-popup">
            <button onClick={thirdPopup}>✖</button>
            <h3 className="about-txt"> {translations.getPointsPopup}</h3>
            </div>
          ) : null}

          {showFourthPopup ? (
            <div className="help-popup">
            <button onClick={fourthPopup}>✖</button>
            <h3 className="about-txt"> {translations.changePhoneNumberPopup}</h3>
            </div>
          ) : null}  
        </div>
      </div>
    </div>
  );
}






