import React, { useState, useEffect } from 'react';
import { Buffer } from 'buffer';
import Carousel from 'react-bootstrap/Carousel';

export function Campaign() {
    const [campaignImage, setCampaignImage] = useState('');
    const [state, setState] = useState('');


  useEffect(() => {
    fetch('http://localhost:8080/campaign/latest')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      try {
        const { image } = data;
        if (typeof image === 'string') {
          setCampaignImage(image);
        } else {
          throw new Error('Invalid image data');
        }
      } catch (error) {
        console.error('Error setting campaign image:', error);
        setState({ campaignImage: null, error: error.message });
      }
    })
    .catch(error => {
      console.error('Error fetching campaign data:', error);
      setState({ campaignImage: null, error: error.message });
    });
  
  
  }, []);


  
  
return(
     <div className='slideShow'>
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={campaignImage}
          alt="First slide"
        />
     </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={campaignImage}
          alt="Second slide"
        />
        </Carousel.Item>
        </Carousel>
    </div>
    )
    }