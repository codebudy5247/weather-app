import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface MapDisplayProps {
  latitude: number;
  longitude: number;
  zoomLevel: number;
  onMapClick: (lat: number, lng: number) => void;
}

const ClickableMap = ({
  onMapClick,
  setClickedPosition,
}: {
  onMapClick: (lat: number, lng: number) => void;
  setClickedPosition: (pos: [number, number]) => void;
}) => {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      setClickedPosition([lat, lng]);
      onMapClick(lat, lng);
    },
  });
  return null;
};

const MapCenterHandler = ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => {
  const map = useMap();
  useEffect(() => {
    map.setView([latitude, longitude]);
  }, [latitude, longitude, map]);
  return null;
};

const MapDisplay = ({
  latitude,
  longitude,
  zoomLevel,
  onMapClick,
}: MapDisplayProps) => {
  const [clickedPosition, setClickedPosition] = useState<
    [number, number] | null
  >(null);

  useEffect(() => {
    setClickedPosition([latitude, longitude]);
  }, [latitude, longitude]);

  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={zoomLevel}
      scrollWheelZoom={false}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {clickedPosition && (
        <Marker position={clickedPosition}>
          <Popup>
            You clicked here: <br /> Latitude: {clickedPosition[0]}, Longitude:{" "}
            {clickedPosition[1]}
          </Popup>
        </Marker>
      )}
      <ClickableMap
        onMapClick={onMapClick}
        setClickedPosition={setClickedPosition}
      />
      <MapCenterHandler latitude={latitude} longitude={longitude} />
    </MapContainer>
  );
};

export default MapDisplay;
