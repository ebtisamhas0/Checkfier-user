import React, { useState, useContext } from "react";
import '../App.css'
import { useStore } from "../components/StoreContext";
import { UserContext } from '../components/UserContext';
import { AiOutlineSearch,AiOutlineRight } from "react-icons/ai";
import axios from 'axios';

export function Help() {
  const { store } = useStore();
  const [question, setQuestion] = useState('');
  const { userPhone, setUserPhone } = useContext(UserContext);


  const handleSubmit = async (event) => {
    event.preventDefault();
    const currentDate = new Date().toISOString().slice(0, 10);
  
    try {
      const response = await fetch('http://localhost:3000/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          question,
          userPhone,
          date: currentDate
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
      alert('There was an error submitting your question. Please try again later.');
    }
  
  };


  return (
    <div className="Container" style={{backgroundColor:store.color}}>
      <div className="help-main">
        <h2>How can I help you?</h2>
        <div className="questions-container">
          <h5>Getting started<AiOutlineRight style={{fontSize:15}}/> </h5> 
          <h5>Create Account<AiOutlineRight style={{fontSize:15}}/> </h5> 
          <h5>Get Points<AiOutlineRight style={{fontSize:15}}/> </h5> 
          <h5>Change phone number<AiOutlineRight style={{fontSize:15}}/> </h5> 
        </div>

        <div className="contact" style={{color:store.color}}>
          <h5>Do you still need our help?</h5>
          <h6>Send your question and we'll back soon </h6>

          <form onSubmit={handleSubmit} className="contact-form">
          <input type="text" id="question" name="question" value={question} onChange={(event) => setQuestion(event.target.value)} required />
            <div className="contact-btn" style={{backgroundColor:store.color}}>
              <button type="submit">Send</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}







