import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function GeoCoderExample() {
    const [position, setPosition] = useState(null);
    const [address, setAddress] = useState("");
    const [error, setError] = useState(null);

    const handleGeocode = async () => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
            );
            const data = await response.json();

            if (data.length > 0) {
                const { lat, lon } = data[0];
                setPosition([parseFloat(lat), parseFloat(lon)]);
            } else {
                setError("Address not found");
            }
        } catch (err) {
            setError("Error fetching location");
        }
    };

    return (
        <div>
            <h2>Geocode an Address</h2>
            <input
                type="text"
                value={address}
                placeholder="Enter location (e.g., Delhi, India)"
                onChange={(e) => setAddress(e.target.value)}
            />
            <button onClick={handleGeocode}>Find</button>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <MapContainer
                center={position || [28.6139, 77.209]}
                zoom={position ? 13 : 5}
                style={{ height: "400px", width: "100%", marginTop: "10px" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="© OpenStreetMap contributors"
                />
                {position && (
                    <Marker position={position}>
                        <Popup>{address}</Popup>
                    </Marker>
                )}
            </MapContainer>
        </div>
    );
}
