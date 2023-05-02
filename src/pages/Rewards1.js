import React, {useContext} from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom';
import { BsArrowRight } from "react-icons/bs";
import { useStore } from '../components/StoreContext';
import { Advertisement } from '../components/Advertisement';
export function Rewards1() {
    const navigate = useNavigate()
    const { store } = useStore();
   

//Navigation
    function handleOnNavigate() {
        navigate("/Rewards2") ;
      }
      


return (
    <div className='Container' style={{backgroundColor:store.color}}>
        <Advertisement/>
        <img className='reward-img' src={require('../images/rewards1.png') } height='210vh'></img>
        <h2>With {store.name} CheckIn you can earn rewards from anywhere at anytime!</h2>
        <BsArrowRight onClick={handleOnNavigate}/>
        <img  className='coin-img' src={require('../images/coin.png')}height='60vh'></img>

    </div>
)
  
}