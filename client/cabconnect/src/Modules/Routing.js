
import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet/hooks";
import axios from "axios";

L.Marker.prototype.options.icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
});

export default function Routing({ booking, cabpos }) {
    const map = useMap();
    const routingControlRef = useRef(null);
    const [route, setRoute] = useState([])

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

        const control = L.Routing.control({
            waypoints: [
                L.latLng(12.968045, 79.156126),
                L.latLng(12.96, 79.156),
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

            if (booking) {
                const routeinfo = coordinates.map((coord, index) => ({ bookingId: 2702, waypoint: index, Lat: coord.lat, Lng: coord.lng }))
                console.log(routeinfo);
                try {
                    const response = await axios.post("http://localhost:8080/route", routeinfo);
                }
                catch {
                    console.log("error Homie");
                }
            }
            console.log("cab location", cabpos);

        });
        // console.log("booking:", booking)



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
    }, [map]);
    return null;
}
