import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix for default marker icon not showing in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to recenter map when position changes
const RecenterMap = ({ position }) => {
    const map = useMap();
    useEffect(() => {
        if (position) {
            map.setView([position.lat, position.lng], map.getZoom());
        }
    }, [position, map]);
    return null;
};

const LiveTracking = () => {
    const [currentPosition, setCurrentPosition] = useState({
        lat: 28.6139,  // Default to Delhi, India
        lng: 77.2090
    });

    useEffect(() => {
        // Get initial position
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCurrentPosition({
                    lat: latitude,
                    lng: longitude
                });
            },
            (error) => {
                console.log('Geolocation error:', error);
            },
            { enableHighAccuracy: true }
        );

        // Watch for position changes
        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCurrentPosition({
                    lat: latitude,
                    lng: longitude
                });
            },
            (error) => {
                console.log('Watch position error:', error);
            },
            { enableHighAccuracy: true }
        );

        // Update position every 10 seconds
        const intervalId = setInterval(() => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log('Position updated:', latitude, longitude);
                    setCurrentPosition({
                        lat: latitude,
                        lng: longitude
                    });
                },
                (error) => {
                    console.log('Interval position error:', error);
                }
            );
        }, 10000);

        // Cleanup
        return () => {
            navigator.geolocation.clearWatch(watchId);
            clearInterval(intervalId);
        };
    }, []);

    return (
        <MapContainer
            center={[currentPosition.lat, currentPosition.lng]}
            zoom={15}
            style={{ width: '100%', height: '100%' }}
            scrollWheelZoom={true}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[currentPosition.lat, currentPosition.lng]}>
                <Popup>
                    Your current location
                </Popup>
            </Marker>
            <RecenterMap position={currentPosition} />
        </MapContainer>
    )
}

export default LiveTracking