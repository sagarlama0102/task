import React from 'react';

const AboutUs =()=>{
    return(
        <section id="aboutus">
        <h2>About Us</h2>
        <div className="about-container">
            <div className="about-box">
                <h3>Our Mission</h3>
                <p>To help teams manage their tasks and achieve success with a streamlined task management system.</p>
            </div>
            <div className="about-box">
                <h3>Our Vision</h3>
                <p>Providing an intuitive, user-friendly platform to organize and track all your projects, big or small.</p>
            </div>
            <div className="about-box">
                <h3>Why Choose Us?</h3>
                <p>We offer advanced features to boost productivity and keep your projects on track, helping you meet deadlines effortlessly.</p>
            </div>
        </div>
    </section>
    );
};

export default AboutUs;