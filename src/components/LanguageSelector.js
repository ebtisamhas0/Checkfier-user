import React, { useContext } from 'react';
import { LanguageContext } from './LanguageContext';
import '../App.css';
function LanguageSelector() {
  const { language, setLanguage } = useContext(LanguageContext);

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <div>
      <select id="language-select" value={language} onChange={handleLanguageChange} 
      style={{position:'absolute',right:5,marginTop:5,backgroundColor:'rgb(0,0,0,0)',color:'#FFFCF1',border:'none',fontSize: 20}}>
        <option value="en">En</option>
        <option value="ar">Ar</option>
        {/* Add more language options here */}
      </select>
    </div>
  );
}

export default LanguageSelector;

