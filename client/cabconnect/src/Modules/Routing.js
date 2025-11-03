
import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet/hooks";
import axios from "axios";

L.Marker.prototype.options.icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
});

export default function Routing({ booking, userPos }) {
    const map = useMap();
    const routingControlRef = useRef(null);
    const [route, setRoute] = useState([])
    //console.log("booking details", booking.cab.latitude);
    const cablat = booking?.cab?.latitude;
    const cablong = booking?.cab?.longitude;
    const userlat = userPos?.lat;
    const userLong = userPos?.lng;
    const bookingId = booking?.bookingId;
    console.log("booking id", bookingId);
    //console.log(cablat, cablong);
    useEffect(() => {
        if (!map) return;

        if (routingControlRef.current) {
            try {
                routingControlRef.current.getPlan().setWaypoints([]);
                map.removeControl(routingControlRef.current);
                console.log(routingControlRef.current.getPlan())
            } catch (err) {
                console.log("Old removeas already")
            }
            routingControlRef.current = null;
        }
        console.log(cablat, cablong)
        // console.log("cablocation", booking?.cab?.latitude);
        const control = L.Routing.control({
            waypoints: [
                L.latLng(userlat, userLong),
                L.latLng(cablat, cablong),
            ],
            routeWhileDragging: false,
            show: false,
            addWaypoints: false,
            fitSelectedRoutes: true,
            draggableWaypoints: true,
        }).addTo(map);

        control.on("routesfound", async (e) => {
            const coordinates = e.routes[0].coordinates;
            console.log("Route", coordinates);
            setRoute(coordinates);
            console.log(routingControlRef.current);
            if (booking) {
                const routeinfo = coordinates.map((coord, index) => ({ bookingId: bookingId, waypoint: index, Lat: coord.lat, Lng: coord.lng }))
                console.log("routeinfo ", routeinfo);
                try {
                    const response = await axios.post("http://localhost:8080/route", routeinfo);
                }
                catch {
                    console.log("error Homie");
                }
            }
            //console.log("cab location", cabpos);

        });
        // console.log("booking:", booking)

        console.log(routingControlRef.current);

        routingControlRef.current = control;
        return () => {
            if (routingControlRef.current) {
                try {
                    routingControlRef.current.getPlan().setWaypoints([]);
                    map.removeControl(routingControlRef.current);
                } catch (err) {
                    console.log("clean skip");
                } finally {
                    routingControlRef.current = null;
                }
            }
        };
    }, [map, cablat, cablong]);
    return null;
}
