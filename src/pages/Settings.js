import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
    AiOutlineUser, 
    AiOutlineRight,
    AiOutlineInfoCircle, 
    AiOutlinePhone } from "react-icons/ai";
import '../App.css'    

export  function Settings() {
    const navigate = useNavigate()
    const handleAboutNavigate = () => navigate("/About")
    const handleHelpNavigate = () => navigate("/Help")
    const handleChangeNavigate = () => navigate("/Change")
   const getNumber =() => {
    axios.get('/show-number')
    .then(function (response) {
        // handle success
        console.log(response);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
        // always executed
    });
}


    return(

        <div className="Container">
            <img className='avatar' src={require('../images/user.png')}height='128vh'></img>
            <hr style={{width:'90%'}} />
          <div className='settings-main'> 
            <div className='section d-flex'>
                <AiOutlineUser/>
                <h4 >Help centre</h4>
                <AiOutlineRight onClick={handleHelpNavigate} /> 
            </div>

            <div className='section d-flex'>
                <AiOutlineInfoCircle/>
                <h4>About</h4>
                <AiOutlineRight onClick={handleAboutNavigate} /> 
            </div>

            <div className='section-phone  d-flex'>
                <AiOutlinePhone/>
                <h4 className='phone-num'>Phone:</h4>
                <label ></label>
            </div>
            <button style={{opacity:0.7, backgroundColor:'rgba(0,0,0,0.0)',border:'none',color:'#FFFCF1'}} onClick={handleChangeNavigate}>Change phone number?</button>
           </div>
        </div>




    )}