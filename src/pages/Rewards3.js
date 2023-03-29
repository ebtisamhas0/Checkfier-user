import React, {useState, useEffect} from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
export function Rewards3() {
    const navigate = useNavigate()
    const handleOnNavigate = () => navigate("/Rewards2")

return(
    <div className='Container'>
     <div className='slideShow'>
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={require("../images/product1.png")}
          alt="First slide"
        />
     </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={require("../images/product2.png")}
          alt="Second slide"
        />
        </Carousel.Item>
        </Carousel>
    </div>
    <div className='main-content '>
        <div className='points d-flex mt-3 p-2'>
            <img src={require("../images/coin.png")}height='20vh'></img>
            <h5 >250 point</h5>
        </div>

        <div className='wallet'style={{opacity:0.7}}>
            <h3 onClick={handleOnNavigate} >Reward Wallet</h3>
            <hr style={{width:'30vh'}}/>
        </div>
        <div className='redeem'>
            <h3>Redeem</h3>
            <hr style={{width:'30vh'}}/>
        </div>
        </div>
     
        <h4 className='hover-txt'>5% off entire order</h4>
        <div className='redeem1 p-3'>
          <h3 className='redeem-txt '>Copoun unlocked</h3>
          <button style={{backgroundColor:"#ffe8d1", borderRadius:15, borderColor:'#342802'}}>Redeem for 300</button>
        </div>
        <h4 className='hover-txt2 m-5'>10% off entire order</h4>
        <div className='redeem2 p-3'>
        <h3 className='redeem-txt '>Locked Redeem this at 1000 pts</h3>
        </div>

         

    </div>
    
)





}