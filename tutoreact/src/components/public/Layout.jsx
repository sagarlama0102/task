import React from "react";

import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import AboutUs from "./AboutUs";
import Footer from "./Footer";

function Layout(){
    return(
        <>
        <Navbar/>
      <HeroSection/>
      <AboutUs/>
      <Footer/>
        </>
    );
}
export default Layout;