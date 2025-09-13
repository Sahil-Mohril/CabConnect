import React, { useState } from "react";
//import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
export default function NavBar() {
    const [profileopen, showprofile] = useState(false);


    return <>
        <div className="Navbar">
            {/* <div className="logo"><img src="logo.png" /></div> */}
            <div className="Nav-contents">
                <div className="logo"></div>
                <a href=""></a>
                <a href=""></a>
                <button className="profile" onClick={() => showprofile(!profileopen)}></button>
            </div>
        </div>
        {profileopen && <div className="profile-window">
            <div>
                <h3>Profile</h3>
            </div>
            <div className="profile-pic"><img src="profile3.jpg" /> </div>
            <p className="user-name">Sahil Mohril</p>
            <hr className="l1" width="100%" size="1" />

        </div>}
    </>
}