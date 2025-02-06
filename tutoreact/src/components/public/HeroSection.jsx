import React from "react";
// import './App.css'
import { useNavigate } from 'react-router-dom';

const HeroSection=()=>{
    const navigate = useNavigate();
    const loginpage =()=>{
        navigate("/Login")
    }
    return(
        
        <section id="home">
        <div className="hero_sec">
            <div className="hero-text">
            <h1>All tasks, big or small, <br/> are always in control </h1>
            <p>Keep all your projects on track! Our task manager helps you <br/> manage tasks efficiently and achieve success.</p>
            <button className="signupbtn" onClick ={loginpage}>Get Started</button>
            </div>
            <div className="hero-image">
                <img src="src/assets/herosec.png" alt="image not found"/>
            </div>
        </div>
        
    </section>
    );
};

export default HeroSection;