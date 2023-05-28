import React,{useContext, useState, useEffect} from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom';
import { useStore } from '../components/StoreContext';
import { UserContext } from '../components/UserContext';
import { Campaign } from '../components/Campaign';
import { LanguageContext } from '../components/LanguageContext';
import rewardsTranslations from '../translations/rewards';
import { serverUrl } from '../config';

export function Rewards2() {
  const navigate = useNavigate()
  const handleOnNavigate = () => navigate("/Rewards3")

  const { store } = useStore();
  const {points} = useContext(UserContext);
  const [rewards, setRewards] = useState([]);
  const { language } = useContext(LanguageContext);
  const translations = rewardsTranslations[language];



      async function fetchRewards(userPoints) {
      try {
        // Fetch rewards from the server with points greater than or equal to the user's points
        console.log(`Fetching rewards from server with userPoints=${userPoints}...`);
        const response = await fetch(`${serverUrl}/rewards?userPoints=${userPoints}`);
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
   <Campaign/>
  <div className='main-content '>
      <div className='points d-flex mt-3 p-2'>
          <img src={require("../images/coin.png")}height='20vh'></img>
        
          <h5 style={{marginLeft: 3}} >{points} {translations.point}</h5>
      </div>

      <div className='wallet'>
          <h3>{translations.rewardWallet}</h3>
          <hr style={{width:'20vh'}}/>
      </div>
      <div className='redeem' style={{opacity:0.7}}>
            <h3 onClick={handleOnNavigate}>{translations.redeem} </h3>
            <hr style={{width:'20vh'}}/>
        </div>
        </div>

        <div className="rewards-container">
  {rewards.length === 0 && <p style={{ fontSize: 20, marginTop: 15 }}>{translations.noReward}</p>}
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
    
