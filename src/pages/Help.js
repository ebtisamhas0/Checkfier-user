import React from "react";
import '../App.css'
import { useStore } from "../StoreContext";
export  function Help() {
    const { store } = useStore();

    return(
        <div className="Container" style={{backgroundColor:store.color}}>
            <div className="help-main">
            <h2>Common Questions:</h2>
            <hr/>
            <h4>How do I get points?</h4>
            <hr style={{width:'100%'}}/>
            </div>
        </div>
    )}