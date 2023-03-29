import React, {useState, useEffect} from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom';

export function Rewards1() {
    const navigate = useNavigate()
//Navigation
    function handleOnNavigate() {
        navigate("/Rewards2") ;
      }
      setInterval(handleOnNavigate, 4000);


return (
    <div className='Container'>
        <img className='reward-img' src={require('../images/rewards1.png') } height='210vh'></img>
        <h2>With Checkfier you can earn rewards from anywhere at anytime!</h2>
        <img className='coin-img' src={require('../images/coin.png')}height='60vh'></img>

    </div>
)
  
}