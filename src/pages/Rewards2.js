import React,{useContext, useState, useEffect} from 'react'
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
  const [rewards, setRewards] = useState([]);
 
 
    async function fetchRewards(userPoints) {
      try {
        // Fetch rewards from the server with points greater than or equal to the user's points
        console.log(`Fetching rewards from server with userPoints=${userPoints}...`);
        const response = await fetch(`http://localhost:3000/rewards?userPoints=${userPoints}`);
        const rewardsData = await response.json();
        console.log('Rewards Data:', rewardsData);
    
        // Update the state with the rewards data
        setRewards(rewardsData);
      } catch (err) {
        console.error(err);
      }
    }
   
    // Call the fetchRewards function with the user's points value as a parameter
    useEffect(() => {
      fetchRewards(points);
    }, [points]);

   

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
          <hr style={{width:'20vh'}}/>
      </div>
      <div className='redeem' style={{opacity:0.7}}>
            <h3 onClick={handleOnNavigate}>Redeem </h3>
            <hr style={{width:'20vh'}}/>
        </div>
        </div>

        <div className="rewards-container">
  {rewards.length === 0 && <p style={{ fontSize: 20, marginTop: 15 }}>You have no rewards</p>}
  {rewards.length > 0 && (
    <React.Fragment>
      {rewards.map((reward, index) => {
        console.log('Rendering reward:', reward);
        return (
          <div key={index} className={`coupon-box coupon1`}>
            <img className="coupon-img" src={require(`../images/reward.png`)} alt={reward.name} />
            <h3 className="coupon-txt">{reward.type}</h3>
          </div>
        );
      })}
    </React.Fragment>
  )}
</div>
</div>
)}
