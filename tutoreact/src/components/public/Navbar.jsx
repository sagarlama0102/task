import React from 'react';
import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import './App.css';

const Navbar =() =>{
    const navigate = useNavigate();
    const loginpage =()=>{
        navigate("/Login")
    }
    const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
    return (
        <nav id="navbar" className={menuOpen ? "open" : ""}>
        <div id="logo">
            <img src="src/assets/secondtasklogo-removebg-preview.png" alt="logo not found" />
        </div>
            <ul id="nav_items">
            <li className="items"><a href="#home">Home</a></li>
            <li className="items"><a href="#aboutus">About Us</a></li>
            <li className="items"><a href="#footer">Contact US</a></li>
        </ul>
        <div>
            <button className="loginbtn"  onClick ={loginpage}>Login</button>
        </div>
       
        
    </nav>
    );
};

export default Navbar;