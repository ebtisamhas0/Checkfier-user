import React, { useState, useEffect } from 'react';
import { Buffer } from 'buffer';
import { AiOutlineCloseCircle } from "react-icons/ai";
import { serverUrl } from '../config';

export function Advertisement() {

    const [adData, setAdData] = useState(null);
    const [error, setError] = useState(null);
    const [showAd, setShowAd] = useState(true);
    
    useEffect(() => {
      fetch(`${serverUrl}/ad`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log(data);
          if (data && data.image) {
            const base64Image = Buffer.from(data.image, 'base64').toString('base64');
            const mimeType = data.imageType === 'png' ? 'image/png' : 'image/jpeg';
            const adDataWithBase64 = {
              link: data.link,
              image: `data:${mimeType};base64,${base64Image}`
            };
            console.log(adDataWithBase64);
            setAdData(adDataWithBase64);
          } else {
            console.log('Ad data is missing or incomplete');
            setError(new Error('Ad data is missing or incomplete'));
          }
        })
        .catch(error => {
            console.error(error);
            setError(error);
          });
      }, []);
      
      const handleCloseClick = () => {
        setShowAd(false);
      };
      
      return (
        <div>
          {showAd && error ? (
            <div>Error: {error.message}</div>
          ) : showAd && adData && adData.image ? (
            <div style={{ position: 'relative' }}>
              <button style={{ position: 'absolute', top: 0, right: 0 }} onClick={handleCloseClick}><AiOutlineCloseCircle/></button>
              <a href={adData.link} target="_blank">
                <img src={adData.image} alt="Advertisement" style={{height:120}}/>
              </a>
            </div>
          ) : null}
        </div>
      );
      
          }      