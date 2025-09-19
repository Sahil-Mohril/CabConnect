import React, { useEffect, useRef, useState } from "react";
import logo from './logo.png'
import CarLogo from './car.png';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import osm from "./osm-providers.js";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { getCabLocations } from "../services/CabController.js";
//import style from './styles/style.css'
export default function Home() {
    const [center, setCenter] = useState({ lat: 12.968045, lng: 79.156126 });
    const [cabpos, setcabpos] = useState([]);
    const [openBooking, setOpenBooking] = useState(false);
    const ZOOM_LEVEL = 18;
    const mapRef = useRef();
    useEffect(() => { fetchCabLocations(); }, []);
    const cabIcon = new L.Icon({
        iconUrl: CarLogo,
        iconSize: [45, 35],
    })
    const userIcon = new L.Icon({
        iconUrl: CarLogo,
        iconSize: [35, 35],
    })
    const fetchCabLocations = async () => {
        const data = await getCabLocations();
        setcabpos(data);
    }
    return (<>
        <div className="layout">
            <div className="left">
                <div className="logo"><img src={logo} /></div>
                {!openBooking && <div className="button" onClick={() => { setOpenBooking(true) }} ><p>Book a Ride</p></div>}
                {openBooking && <div className="booking-window">
                    <label>Pickup Location</label><br />
                    <input type="text" name="start_loc"></input><br />
                    <label>Drop Location</label><br />
                    <input type="text" name="end_loc"></input><br />
                </div>}
            </div>
            <div className="map">
                <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
                    <TileLayer url={osm.maptiler.url} attribution={osm.maptiler.attribution} />
                    {cabpos.map((cab) => (
                        <Marker key={cab.id} position={[cab.latitude, cab.longitude]} icon={cabIcon}>
                            <Popup>Cab id: {cab.id}</Popup>
                        </Marker>
                    ))}


                </MapContainer>
            </div>
        </div >

    </>)
}