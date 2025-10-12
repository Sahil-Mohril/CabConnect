
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet/hooks";
import axios from "axios";

L.Marker.prototype.options.icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
});

export default function Routing() {
    const map = useMap();
    const routingControlRef = useRef(null);

    useEffect(() => {
        if (!map) return;

        if (routingControlRef.current) {
            try {
                routingControlRef.current.getPlan().setWaypoints([]);
                map.removeControl(routingControlRef.current);
                console.log(routingControlRef.current.getPlan())
            } catch (err) {
                console.warn("Old routing control already removed:", err);
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

        routingControlRef.current = control;
        return () => {
            if (routingControlRef.current) {
                try {
                    routingControlRef.current.getPlan().setWaypoints([]);
                    map.removeControl(routingControlRef.current);
                } catch (err) {
                    console.warn("Routing cleanup skipped:", err);
                } finally {
                    routingControlRef.current = null;
                }
            }
        };
    }, [map]);
    console.log(" Current routingControlRef:", routingControlRef.current._routes[0].coordinates);
    return null;
}
