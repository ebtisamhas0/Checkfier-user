import React from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom';
import { BsArrowRight } from "react-icons/bs";

export function Rewards1() {
    const navigate = useNavigate()
//Navigation
    function handleOnNavigate() {
        navigate("/Rewards2") ;
      }
      


return (
    <div className='Container'>
        <img className='reward-img' src={require('../images/rewards1.png') } height='210vh'></img>
        <h2>With Checkfier you can earn rewards from anywhere at anytime!</h2>
        <BsArrowRight onClick={handleOnNavigate}/>
        <img  className='coin-img' src={require('../images/coin.png')}height='60vh'></img>

    </div>
)
  
}