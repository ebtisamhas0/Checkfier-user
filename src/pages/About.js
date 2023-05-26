import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../components/StoreContext";
import { LanguageContext } from '../components/LanguageContext';
import aboutTranslations from '../translations/about';

export function About() {
    const navigate = useNavigate();
    const { store } = useStore();
    const { language } = useContext(LanguageContext);
    const translations = aboutTranslations[language].about;

    return (
        <div className="Container" style={{backgroundColor:store.color}}>
            <div className="about-main">
                <img className='logo' src={store.logo} style={{width:150, height:150}}/>
                <h3 className="about-txt">{store.name} {translations.description}</h3>
            </div>  
        </div>
    );
}
