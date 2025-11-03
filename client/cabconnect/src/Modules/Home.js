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
    const [startpos, setStartPos] = useState({ lat: 0.0, lng: 0.0 });
    const [cabpos, setcabpos] = useState([]);
    const [openBooking, setOpenBooking] = useState(false);
    const [showbooking, setShowBooking] = useState(false);
    const [estimatedPrice, setEstimatedPrice] = useState(null);
    const [useCurrentLoc, setUseCurrentLoc] = useState(false);
    const [booking, setBooking] = useState({});
    const [startAddress, setStartAddress] = useState("");
    const [destAddress, setDestAddress] = useState("");
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
    useEffect(() => {
        if (destpos.lat !== 0 && destpos.lng !== 0) {
            console.log("Destination position updated:", destpos);
        }
    }, [destpos]);
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
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of Earth (km)
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) *
            Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    const calculatePrice = (distanceKm) => {
        const baseFare = 40;
        const ratePerKm = 15; 
        return baseFare + distanceKm * ratePerKm;
    };
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
    const createBooking = async (destination, startLocation) => {
        // const userData = await getUserLocation();
        // if (!useCurrentLoc) {
        //     //setStartPos(handleStartGeocode());
        //     console.log("Start loc", startpos.lat, startpos.lng);
        // }
        const pos = startLocation || userPos;
        // const pos = { lat: userData.latitude, lng: userData.longitude };
        setUserPos(pos);

        const bookingDTO = {
            userId: userId,
            startLat: pos.lat,
            startLong: pos.lng,
            endLat: destination.lat,
            endLong: destination.lng,
            startTime: new Date(),
        };
        const data = await postBookingDTO(bookingDTO);
        return data;
    };
    const handleAddBooking = async () => {
        //sethello();
        let startLocation;
        const destination = await handleDestGeocode();
        if (useCurrentLoc) {
            startLocation = userPos;
        } else {
            startLocation = await handleStartGeocode();
        }
        await createBooking(destination, startLocation);
        fetchCurentBooking();
        setShowBooking(true);
         const distance = calculateDistance(
        startLocation.lat, startLocation.lng,
        destination.lat, destination.lng
    );
    const price = calculatePrice(distance);
    setEstimatedPrice(price.toFixed(2));
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
    const useCurrentLocation = () => {
        setUseCurrentLoc(true);
        setStartAddress("Use Current Location");

    }
    const handleDestGeocode = async () => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(destAddress)}`
            );
            const data = await response.json();

            if (data.length > 0) {
                const { lat, lon } = data[0];
                const pos = { lat: parseFloat(lat), lng: parseFloat(lon) };
                setDestPos(pos);
                return pos;
            } else {
                console.log("Address not found");
                return destpos;
            }
        } catch (err) {
            console.log("Error fetching location");
            return destpos;
        }
    };
    const handleStartGeocode = async () => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(startAddress)}`
            );
            const data = await response.json();

            if (data.length > 0) {
                const { lat, lon } = data[0];
                const pos = { lat: parseFloat(lat), lng: parseFloat(lon) };
                console.log("pos", pos);
                setStartPos(pos);
                return pos;
            } else {
                console.log("Address not found");
                return userPos;
            }
        } catch (err) {
            console.log("Error fetching location");
            return userPos;
        }
    };
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
                    <input type="text" name="start_loc" value={startAddress} onChange={(e) => setStartAddress(e.target.value)}></input>
                    <button className="currentLocation" onClick={useCurrentLocation}></button><br />
                    <label>Drop Location</label><br />
                    <input type="text" name="end_loc" value={destAddress} onChange={(e) => setDestAddress(e.target.value)}></input><br />
                    {/* {console.log(useCurrentLoc)} */}
                    {/* <p>{startAddress}-{destAddress}</p> */}

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
                    {estimatedPrice && (
                                <>
                                    <h3>Estimated Fare</h3>
                                    <p><b>₹{estimatedPrice}</b></p>
                                </>
                            )}

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


// import React, { useEffect, useRef, useState } from "react";
// import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
// import logo from './logo.png';
// import CarLogo from './car.png';
// import UserLocation from './userlocation.png';
// import osm from "./osm-providers.js";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import { getCabLocations } from "../services/CabController.js";
// import { getCurrentBooking, postBookingDTO } from "../services/BookingController.js";
// import { getUserLocation } from "../services/UserController.js";
// import Routing from "./Routing.js";

// export default function Home() {
//     const userId = 504;
//     const [center, setCenter] = useState({ lat: 12.968045, lng: 79.156126 });
//     const [userPos, setUserPos] = useState({ lat: 0.0, lng: 0.0 });
//     const [destpos, setDestPos] = useState({ lat: 12.971590, lng: 79.138268 });
//     const [startpos, setStartPos] = useState({ lat: 0.0, lng: 0.0 });
//     const [cabpos, setcabpos] = useState([]);
//     const [openBooking, setOpenBooking] = useState(false);
//     const [showbooking, setShowBooking] = useState(false);
//     const [useCurrentLoc, setUseCurrentLoc] = useState(false);
//     const [booking, setBooking] = useState({});
//     const [startAddress, setStartAddress] = useState("");
//     const [destAddress, setDestAddress] = useState("");
//     const [estimatedPrice, setEstimatedPrice] = useState(null);
//     const ZOOM_LEVEL = 18;
//     const mapRef = useRef();

//     useEffect(() => {
//         const fetchData = async () => {
//             await fetchCabLocations();
//             await fetchUserLocation();
//         };
//         fetchData();
//     }, []);

//     useEffect(() => {
//         if (mapRef.current && userPos.lat !== 0 && userPos.lng !== 0) {
//             const map = mapRef.current;
//             if (map.setView)
//                 map.setView([userPos.lat, userPos.lng], ZOOM_LEVEL);
//         }
//     }, [userPos]);

//     const cabIcon = new L.Icon({
//         iconUrl: CarLogo,
//         iconSize: [45, 35],
//     });
//     const userIcon = new L.Icon({
//         iconUrl: UserLocation,
//         iconSize: [35, 35],
//     });

//     const fetchCabLocations = async () => {
//         const data = await getCabLocations();
//         setcabpos(data);
//     };

//     const fetchCurentBooking = async () => {
//         const data = await getCurrentBooking();
//         setBooking(data);
//     };

    
//     const calculateDistance = (lat1, lon1, lat2, lon2) => {
//         const R = 6371; // Radius of Earth (km)
//         const dLat = (lat2 - lat1) * Math.PI / 180;
//         const dLon = (lon2 - lon1) * Math.PI / 180;
//         const a =
//             Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//             Math.cos(lat1 * Math.PI / 180) *
//             Math.cos(lat2 * Math.PI / 180) *
//             Math.sin(dLon / 2) *
//             Math.sin(dLon / 2);
//         const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//         return R * c;
//     };

//     const calculatePrice = (distanceKm) => {
//         const baseFare = 40;
//         const ratePerKm = 15; 
//         return baseFare + distanceKm * ratePerKm;
//     };

//     const createBooking = async (destination, startLocation) => {
//         const pos = startLocation || userPos;
//         setUserPos(pos);

//         const bookingDTO = {
//             userId: userId,
//             startLat: pos.lat,
//             startLong: pos.lng,
//             endLat: destination.lat,
//             endLong: destination.lng,
//             startTime: new Date(),
//         };
//         const data = await postBookingDTO(bookingDTO);

        
//         const dist = calculateDistance(pos.lat, pos.lng, destination.lat, destination.lng);
//         const price = calculatePrice(dist);
//         setEstimatedPrice(price.toFixed(2));

//         return data;
//     };

//     const handleAddBooking = async () => {
//         let startLocation;
//         const destination = await handleDestGeocode();
//         if (useCurrentLoc) {
//             startLocation = userPos;
//         } else {
//             startLocation = await handleStartGeocode();
//         }
//         await createBooking(destination, startLocation);
//         fetchCurentBooking();
//         setShowBooking(true);
//     };

//     const fetchUserLocation = async () => {
//         const data = await getUserLocation();
//         const pos = {
//             lat: data.latitude,
//             lng: data.longitude
//         };
//         setUserPos(pos);
//         return pos;
//     };

//     const useCurrentLocation = () => {
//         setUseCurrentLoc(true);
//         setStartAddress("Use Current Location");
//     };

//     const handleDestGeocode = async () => {
//         try {
//             const response = await fetch(
//                 `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(destAddress)}`
//             );
//             const data = await response.json();
//             if (data.length > 0) {
//                 const { lat, lon } = data[0];
//                 const pos = { lat: parseFloat(lat), lng: parseFloat(lon) };
//                 setDestPos(pos);
//                 return pos;
//             } else {
//                 console.log("Address not found");
//                 return destpos;
//             }
//         } catch (err) {
//             console.log("Error fetching location");
//             return destpos;
//         }
//     };

//     const handleStartGeocode = async () => {
//         try {
//             const response = await fetch(
//                 `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(startAddress)}`
//             );
//             const data = await response.json();
//             if (data.length > 0) {
//                 const { lat, lon } = data[0];
//                 const pos = { lat: parseFloat(lat), lng: parseFloat(lon) };
//                 setStartPos(pos);
//                 return pos;
//             } else {
//                 console.log("Address not found");
//                 return userPos;
//             }
//         } catch (err) {
//             console.log("Error fetching location");
//             return userPos;
//         }
//     };

//     return (
//         <>
//             <div className="layout">
//                 <div className="left">
//                     <div className="logo"><img src={logo} alt="logo" /></div>
//                     {!openBooking && (
//                         <div className="button" onClick={() => setOpenBooking(true)}>
//                             <p>Book a Ride</p>
//                         </div>
//                     )}

//                     {openBooking && (
//                         <div className="booking-window">
//                             <label>Pickup Location</label><br />
//                             <input
//                                 type="text"
//                                 name="start_loc"
//                                 value={startAddress}
//                                 onChange={(e) => setStartAddress(e.target.value)}
//                             />
//                             <button className="currentLocation" onClick={useCurrentLocation}>
//                                 Use Current
//                             </button>
//                             <br />
//                             <label>Drop Location</label><br />
//                             <input
//                                 type="text"
//                                 name="end_loc"
//                                 value={destAddress}
//                                 onChange={(e) => setDestAddress(e.target.value)}
//                             /><br />
//                         </div>
//                     )}

//                     {openBooking && (
//                         <div className="search-button" onClick={handleAddBooking}>
//                             <p>Book Cab</p>
//                         </div>
//                     )}

//                     {openBooking && showbooking && (
//                         <div className="booking-card">
//                             <h2>{booking.cab?.driver?.driverName} is on his way!!</h2>
//                             <h3>Booking ID: {booking.bookingId}</h3>

//                             <h3>Cab</h3>
//                             <p><b>Cab Id:</b> {booking.cab?.cabId}</p>
//                             <p><b>Model:</b> {booking.cab?.model}</p>
//                             <p><b>Vehicle No:</b> {booking.cab?.vehicleNumber}</p>

//                             <h3>Driver</h3>
//                             <p><b>Name:</b> {booking.cab?.driver?.driverName}</p>
//                             <p><b>Mobile:</b> {booking.cab?.driver?.mobileNumber}</p>

//                             {/* 💰 Estimated Price */}
//                             {estimatedPrice && (
//                                 <>
//                                     <h3>Estimated Fare</h3>
//                                     <p><b>₹{estimatedPrice}</b></p>
//                                 </>
//                             )}
//                         </div>
//                     )}
//                 </div>

//                 <div className="map">
//                     <MapContainer center={userPos} zoom={ZOOM_LEVEL} ref={mapRef}>
//                         <TileLayer url={osm.maptiler.url} attribution={osm.maptiler.attribution} />
//                         <Marker position={userPos} icon={userIcon}>
//                             <Popup>You are Here</Popup>
//                         </Marker>
//                         {cabpos.map((cab) => (
//                             <Marker
//                                 key={cab.id}
//                                 position={[cab.latitude, cab.longitude]}
//                                 icon={cabIcon}
//                             >
//                                 <Popup>Cab id: {cab.id}</Popup>
//                             </Marker>
//                         ))}
//                         {openBooking && showbooking && (
//                             <Routing booking={booking} userPos={userPos} />
//                         )}
//                     </MapContainer>
//                 </div>
//             </div>
//         </>
//     );
// }
