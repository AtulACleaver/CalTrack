import React from "react";
import "./Header.css";
import logo from './assets/logo.png';
import pf from './assets/user-pf.png';

function Header() {
    return (
        <div className="header">

            {/*  Creating a NavBar  */}
            <div className="logo">
                <img className='logo-icon' src={logo} alt="CalTrack Logo"/>
                <p className="logo-text">CalTrack</p>
            </div>

            <div className="user">
            {/* user icon */}
                <img className="user-pf" src={pf} alt="user-pf"/>
                <p className="user-credentials">Atul Anand</p>
            </div>

        </div>
    );
}

export default Header;
