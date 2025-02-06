import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Facebook } from 'lucide-react';
import { Mail } from 'lucide-react';
import { Instagram } from 'lucide-react';



const Footer=()=>{
    return(
        <footer id="footer">
        <h2>Contact Us</h2>
        <p>Feel free to reach out to us for any furthur inquiries and support</p>
        <p>Call Us at : +977-9812345678</p>
        <div className="socials">
            <a href="https://www.facebook.com" target="_blank"><Facebook /></a>
            <a href="mailto:example@example.com" target="_blank"><Mail /></a>
            <a href="https://www.instagram.com" target="_blank"><Instagram /></a>
        </div>
    </footer>
    );
};
export default Footer;