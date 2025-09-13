import React from "react";
import logo from './logo.png'
//import style from './styles/style.css'
export default function Home() {
    return (<>
        <div className="layout">
            <div className="left">
                <div className="logo"><img src={logo} /></div>
            </div>
            <div className="map"></div>
        </div>

    </>)
}