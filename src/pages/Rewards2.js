import React,{useContext} from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import { useStore } from '../components/StoreContext';
import { UserContext } from '../components/UserContext';

export function Rewards2() {
    const navigate = useNavigate()
    const handleOnNavigate = () => navigate("/Rewards3")
    const { store } = useStore();
    const {points} = useContext(UserContext);
return(
    <div className='Container' style={{backgroundColor:store.color}}>
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
          
            <h5 style={{marginLeft: 3}} >{points} point</h5>
        </div>

        <div className='wallet'>
            <h3>Reward Wallet</h3>
            <hr style={{width:'30vh'}}/>
        </div>
        <div className='redeem' style={{opacity:0.7}}>
            <h3 onClick={handleOnNavigate}>Redeem </h3>
            <hr style={{width:'30vh'}}/>
        </div>
        </div>

        <div className='copoun1'>
          <img className='copun1-img ' src={require('../images/medal.png')}/>
          <h3 className='coupon-txt '>10% off your next order</h3>
        </div>
        <div className='copoun2'>
          <img className='copun1-img ' src={require('../images/reward.png')}/>
          <h3 className='coupon-txt '>15% off your next order</h3>
        </div>

         

    </div>
    
)





}