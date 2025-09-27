const RoutingMachine = ({ start, end }) => {
    const map = useMap();

    useEffect(() => {
        if (!map || !start || !end) return; // Safety check

        const routingControl = L.Routing.control({
            waypoints: [
                L.latLng(start.lat, start.lng),
                L.latLng(end.lat, end.lng)
            ],
            routeWhileDragging: true
        }).addTo(map);

        return () => {
            if (map && routingControl) {
                map.removeControl(routingControl);
            }
        };
    }, [map, start, end]);

    return null;
};
