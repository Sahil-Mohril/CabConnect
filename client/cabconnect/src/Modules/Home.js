import React, { useRef, useState } from "react";
import logo from './logo.png'
import { MapContainer, TileLayer } from "react-leaflet"
import osm from "./osm-providers.js";
import "leaflet/dist/leaflet.css";
//import style from './styles/style.css'
export default function Home() {
    const [center, setCenter] = useState({ lat: 12.9686, lng: 79.1578 });
    const ZOOM_LEVEL = 18;
    const mapRef = useRef();

    return (<>
        <div className="layout">
            <div className="left">
                <div className="logo"><img src={logo} /></div>
                <div className="button"><p>Book a Ride</p></div>
            </div>
            <div className="map">
                <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
                    <TileLayer url={osm.maptiler.url} attribution={osm.maptiler.attribution} />
                </MapContainer>
            </div>
        </div >

    </>)
}