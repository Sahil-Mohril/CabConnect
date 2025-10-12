import React, { useEffect, useRef, useState } from "react";
import { useMap } from "react-leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import osm from "./osm-providers.js";
import L, { map } from "leaflet";
import Routing from "./Routing";
import "leaflet/dist/leaflet.css";
function MapController() {
    const map = useMap();
    const [pos, setpos] = useState({ Lat: 0.0, Lng: 0.0 })
    useEffect(() => {
        console.log("Map instance:", map);
        map.setView([12.97, 79.15], 15);
    }, [map]);

    map.on('click', function (ev) {
        //console.log(ev.latlng);
        setpos(ev.latlng);
        console.log(pos);

    })
    return null;
}
export default function Map() {
    const [center, setCenter] = useState({ lat: 12.968045, lng: 79.156126 });
    //const map = useMap()
    const zoom = 18;
    const [name, setname] = useState('')
    const rendercount = useRef(1);
    useEffect(() => {
        rendercount.current = rendercount.current + 1;
    })
    // const MapRef = useRef();
    // useEffect(() => {
    //     console.log("Map instance :", MapRef.current)
    //     map = MapRef.current;
    //     map.setView([13.97, 79.15])
    // }, [map]);

    return (<>
        <div className="layout">
            <div className="map">
                <MapContainer center={center} zoom={zoom} >
                    <TileLayer url={osm.maptiler.url} attribution={osm.maptiler.attribution} />
                    <MapController />
                </MapContainer>
            </div>
            <div className="left">
                <div>
                    <input value={name} onChange={e => setname(e.target.value)} />
                </div>
                <div>My mane is {name}</div>
                <div>I rendered {rendercount.current} times</div>
            </div>
        </div>
    </>)

}
