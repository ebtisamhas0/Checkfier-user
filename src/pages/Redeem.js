import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../components/StoreContext';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { LanguageContext } from '../components/LanguageContext';
import helpTranslations from '../translations/help';

export function Redeem() {
  const { code } = useParams();
  const { store } = useStore();
  const [isCopied, setIsCopied] = useState(false);
  const { language } = useContext(LanguageContext);
  const translations = helpTranslations[language];

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1000); // hide "copied" text after 10 seconds
  }


  return (
    <div className='Container' style={{ backgroundColor: store.color }}>
      <img src={require("../images/coupon1.png")} alt='Redeem img' style={{ height: 250, marginTop: 30 }}></img>
      <div>
        <h2>{translations.thankYou} {store.name} {translations.checkIn} </h2>
        <h4>{translations.redeem} </h4><br />
        <CopyToClipboard text={code} onCopy={handleCopy}>
          <h1 style={{textShadow:'revert-layer', color:'rgba(251, 189, 10)'}}>
            {code} {isCopied && <span style={{color:'lightgrey',opacity:0.5,fontSize:20}}>copied!</span>}
          </h1>
        </CopyToClipboard>
        {/* add your redemption page content here */}
      </div>
    </div>
  );
}

