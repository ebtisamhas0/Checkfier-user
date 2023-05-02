import React from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../components/StoreContext";
export  function About() {
    const navigate = useNavigate()
    const { store } = useStore();

    return(
        <div className="Container" style={{backgroundColor:store.color}}>
           <div className="about-main">
           <img className='logo' src={require('../images/logo.png')} style={{width:150, height:150}}/>

            <h3 className="about-txt"> Golden Brown is a reward system web-app where you can easily sign up through phone number and easily track your point, rewards and redeems.</h3>
            </div>  
        </div>
    )}