import React, { useEffect, useRef, useState } from "react";
import logo from './logo.png'
import CarLogo from './car.png';
import UserLocation from './userlocation.png';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import osm from "./osm-providers.js";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { getCabLocations } from "../services/CabController.js";
import { getCurrentBooking } from "../services/BookingController.js";
//import style from './styles/style.css'
export default function Home() {
    const [center, setCenter] = useState({ lat: 12.968045, lng: 79.156126 });
    const [cabpos, setcabpos] = useState([]);
    const [openBooking, setOpenBooking] = useState(false);
    const [showbooking, setShowBooking] = useState(false);
    const [booking, setBooking] = useState({});
    const ZOOM_LEVEL = 18;
    const mapRef = useRef();
    useEffect(() => { fetchCabLocations(); }, []);
    const cabIcon = new L.Icon({
        iconUrl: CarLogo,
        iconSize: [45, 35],
    })
    const userIcon = new L.Icon({
        iconUrl: UserLocation,
        iconSize: [35, 35],
    })
    const fetchCabLocations = async () => {
        const data = await getCabLocations();
        setcabpos(data);
    }
    const fetchCurentBooking = async () => {
        const data = await getCurrentBooking();
        setBooking(data);
    }
    const handleAddBooking = () => {
        fetchCurentBooking();
        setShowBooking(true);
    }
    // const fetchNearestCab = async () => {
    //     const data = await getNearestCab();
    // }
    // const handlesearch = () => {
    //     fetchNearestCab();

    // }
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
                {openBooking && <div className="search-button" onClick={handleAddBooking}><p>Book Cab</p></div>}
                {openBooking && showbooking && <div className="booking-card">
                    <h2>Booking ID: {booking.bookingId}</h2>
                    <h3>Cab</h3>
                    <p><b>Model:</b> {booking.cab?.model}</p>
                    <p><b>Vehicle No:</b> {booking.cab?.vehicleNumber}</p>

                    <h3>Driver</h3>
                    <p><b>Name:</b> {booking.cab?.driver?.driverName}</p>
                    <p><b>Mobile:</b> {booking.cab?.driver?.mobileNumber}</p>
                </div>}
            </div>
            <div className="map">
                <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
                    <TileLayer url={osm.maptiler.url} attribution={osm.maptiler.attribution} />
                    <Marker position={center} icon={userIcon}></Marker>
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