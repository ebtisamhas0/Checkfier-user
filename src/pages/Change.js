import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import {BsFillArrowRightCircleFill } from "react-icons/bs";
import axios from "axios";
import { useStore } from "../StoreContext";

export  function Change() {
    const [phone, setPhone] = useState('');
    const navigate = useNavigate()
    const { store } = useStore();

    const handleSubmit = (e) => {
         e.preventDefault();
         axios.post('http://localhost:3000/update',{
            
            phone:phone
            
            })
        .then(data =>{
            alert(`${data}is Update successffly!!`)
        }).catch(err =>{
            console.log("error",err)
        })
    }


    return(
        <div className="Container" style={{backgroundColor:store.color}}>
            <div className="change-main">
            <h3 >Enter Your New Number</h3>
             <form onSubmit={handleSubmit}>
                <input className='inputBox' type={'text'}
                placeholder='05' minLength={10} maxLength={10}
                value={phone}
                onChange={(event) => {
                    setPhone(event.target.value);
                }} 
                />
                <div>
                <button type='submit' style={{backgroundColor: 'rgba(0,0,0,0.0)', border: 'none',color: '#FFFCF1'}}>
                <BsFillArrowRightCircleFill size={30} >
                </BsFillArrowRightCircleFill>
                </button>
                </div>
            </form>

        </div></div>
    )}