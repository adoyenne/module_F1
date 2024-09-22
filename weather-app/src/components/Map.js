import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';

// Компонент для перемещения карты при изменении города
const MapUpdater = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(position, 13); // Перемещаем карту к новому городу
  }, [position, map]);

  return null;
};

const Map = ({ city }) => {
  const position = [parseFloat(city.lat), parseFloat(city.lon)];

  // Настройка иконки маркера
  const DefaultIcon = L.icon({
    iconUrl: markerIconPng,
    shadowUrl: markerShadowPng,
  });

  L.Marker.prototype.options.icon = DefaultIcon;

  return (
    <MapContainer center={position} zoom={13} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* Компонент, который будет обновлять карту при изменении города */}
      <MapUpdater position={position} />
      <Marker position={position}>
        <Popup>{city.name}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;