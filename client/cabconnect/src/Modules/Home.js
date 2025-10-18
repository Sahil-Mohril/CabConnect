import React, { useEffect, useRef, useState } from "react";
import { useMap } from "react-leaflet";
import logo from './logo.png'
import CarLogo from './car.png';
import UserLocation from './userlocation.png';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import osm from "./osm-providers.js";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { getCabLocations } from "../services/CabController.js";
import { getCurrentBooking, postBookingDTO } from "../services/BookingController.js";
import { getUserLocation } from "../services/UserController.js";
import Routing from "./Routing.js";
//import Routing from "./Routing.js";
//import style from './styles/style.css'
export default function Home() {
    const userId = 504;
    const [center, setCenter] = useState({ lat: 12.968045, lng: 79.156126 });
    const [userPos, setUserPos] = useState({ lat: 0.0, lng: 0.0 });
    const [destpos, setDestPos] = useState({ lat: 12.971590, lng: 79.138268 }) //Katpidi statiton
    const [cabpos, setcabpos] = useState([]);
    const [openBooking, setOpenBooking] = useState(false);
    const [showbooking, setShowBooking] = useState(false);
    const [booking, setBooking] = useState({});
    const ZOOM_LEVEL = 18;
    const mapRef = useRef();
    // useEffect(() => { fetchCabLocations(); fetchUserLocation(); }, []);
    useEffect(() => {
        const fetchData = async () => {
            await fetchCabLocations();
            await fetchUserLocation();
        };
        fetchData();
    }, []);
    useEffect(() => {
        if (mapRef.current && userPos.lat !== 0 && userPos.lng !== 0) {
            const map = mapRef.current;
            // if (map.flyTo) map.flyTo([userPos.lat, userPos.lng], ZOOM_LEVEL);
            if (map.setView)
                map.setView([userPos.lat, userPos.lng], ZOOM_LEVEL);
        }
    }, [userPos]);
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
    // const sethello = async () => {
    //     const data = await hello();
    // }
    // const createBooking = async () => {
    //     const userData = await getUserLocation();

    //     setUserPos(userData);
    //     const bookingDTO = {
    //         userId: userId,
    //         startLat: userPos.lat,
    //         startLong: userPos.lng,
    //         endLat: destpos.lat,
    //         endLong: destpos.lng,
    //         startTime: new Date()
    //     }
    //     const data = await postBookingDTO(bookingDTO);
    // }
    const createBooking = async () => {
        const userData = await getUserLocation();
        const pos = { lat: userData.latitude, lng: userData.longitude };
        setUserPos(pos);

        const bookingDTO = {
            userId: userId,
            startLat: pos.lat,
            startLong: pos.lng,
            endLat: destpos.lat,
            endLong: destpos.lng,
            startTime: new Date(),
        };
        const data = await postBookingDTO(bookingDTO);
        return data;
    };
    const handleAddBooking = async () => {
        //sethello();
        await createBooking();
        fetchCurentBooking();
        setShowBooking(true);
    }
    const fetchUserLocation = async () => {
        const data = await getUserLocation();
        const pos =
        {
            lat: data.latitude,
            lng: data.longitude
        }
        setUserPos(pos);
        // console.log(userPos);
        return pos;

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
                    {console.log(booking)}
                    <h2>{booking.cab?.driver?.driverName} is on his Way!!</h2>
                    <h3>Booking ID: {booking.bookingId}</h3>
                    <h3>Cab</h3>
                    <p><b>Cab Id:</b>{booking.cab?.cabId}</p>
                    <p><b>Model:</b> {booking.cab?.model}</p>
                    <p><b>Vehicle No:</b> {booking.cab?.vehicleNumber}</p>

                    <h3>Driver</h3>
                    <p><b>Name:</b> {booking.cab?.driver?.driverName}</p>
                    <p><b>Mobile:</b> {booking.cab?.driver?.mobileNumber}</p>

                </div>}
            </div>
            <div className="map">
                <MapContainer center={userPos} zoom={ZOOM_LEVEL} ref={mapRef}>
                    <TileLayer url={osm.maptiler.url} attribution={osm.maptiler.attribution} />
                    <Marker position={userPos} icon={userIcon}><Popup>You are Here</Popup></Marker>
                    {cabpos.map((cab) => (
                        <Marker key={cab.id} position={[cab.latitude, cab.longitude]} icon={cabIcon}>
                            <Popup>Cab id: {cab.id}</Popup>
                        </Marker>
                    ))}
                    {openBooking && showbooking && <Routing booking={booking} userPos={userPos} />}
                </MapContainer>
            </div>
        </div >

    </>)
}


