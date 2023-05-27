import React, {useContext,useEffect,useState} from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom';
import { useStore } from '../components/StoreContext';
import { UserContext } from '../components/UserContext';
import { Link } from 'react-router-dom';
import {Campaign} from '../components/Campaign';
import { LanguageContext } from '../components/LanguageContext';
import rewardsTranslations from '../translations/rewards';

export function Rewards3() {
    const navigate = useNavigate()
    const handleOnNavigate = () => navigate("/Rewards2")
    const { store } = useStore();
    const { points, setPoints, userPhone } = useContext(UserContext);
    const [rewards, setRewards] = useState([]);
    const { language } = useContext(LanguageContext);
    const translations = rewardsTranslations[language];

    async function redeemReward(code, redemptionPoints) {
      try {
       
        // Redeem reward from the server
        console.log(`Redeeming reward with code=${code}, points=${points}, redemptionPoints=${redemptionPoints}...`);
        const response = await fetch(`http://localhost:8080/redeem?phone=${userPhone}&redemptionPoints=${redemptionPoints}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            code: code,
            points: points
          })
        });
        const data = await response.json();
        console.log('Redemption Data:', data);
    
        // Update the points in the context
        setPoints(data.user.points);
      } catch (err) {
        console.error(err);
      }
    }
    
    
    
    


    async function fetchRewards(userPoints) {
      try {
        // Fetch rewards from the server with points greater than or equal to the user's points
        console.log(`Fetching rewards from server with userPoints=${userPoints}...`);
        const response = await fetch(`http://localhost:8080/rewards?userPoints=${userPoints}`);
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
    <div className='Container'style={{backgroundColor:store.color}}>
   <Campaign/>
    <div className='main-content '>
        <div className='points d-flex mt-3 p-2'>
            <img src={require("../images/coin.png")}height='20vh'></img>
            <h5 style={{marginLeft: 3}}>{ points } {translations.point}</h5>
        </div>

        <div className='wallet'style={{opacity:0.7}}>
            <h3 onClick={handleOnNavigate} >{translations.rewardWallet}</h3>
            <hr style={{width:'20vh'}}/>
        </div>
        <div className='redeem'>
            <h3>{translations.redeem}</h3>
            <hr style={{width:'20vh'}}/>
        </div>
        </div>
        <div className="redeems-container">
  {rewards.length === 0 && <p style={{ fontSize: 20, marginTop: 15 }}>{translations.noReward}</p>}
  {rewards.length > 0 && (
    <React.Fragment>
      {rewards.map((reward, index) => {
        console.log('Rendering reward:', reward);
        return (
          <div key={index}>
             <h4 className='hover-txt'>{reward.type}</h4>
         <div className='redeem1 p-3'>
        <h3 className='redeem-txt ' style={{color:store.color}}>{translations.Copoun}</h3>
              <button style={{ backgroundColor: "#ffe8d1", borderRadius: 15, color:store.color }}>
                 <Link to={`/redeem/${reward.code}`} onClick={() => redeemReward(points, reward.points)}  style={{color:store.color, textDecoration:'none'}}>{translations.redemption} {reward.points}
                 </Link>
                 </button>
            </div>
          </div>
        );
      })}
    </React.Fragment>
  )}
</div>
</div>
)}


