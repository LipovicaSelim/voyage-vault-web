import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useSelector } from "react-redux";
import axios from "axios";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function DynamicTripMap() {
  const activeTrip = useSelector((state) => state.trips.activeTrip);
  const [hotelCoords, setHotelCoords] = useState(null);
  const [airportCoords, setAirportCoords] = useState(null);

  useEffect(() => {
    const fetchHotelCoords = async () => {
      if (!activeTrip?.hotelDetails?.name) return;
      try {
        const response = await axios.get(
          "https://nominatim.openstreetmap.org/search",
          {
            params: {
              q: activeTrip.hotelDetails.name || "",
              format: "json",
              limit: 1,
              addressDetails: 1,
            },
          }
        );

        console.log("Response from hotel coordinates: )", response);

        if (response.data && response.data.length > 0) {
          const { lat, lon } = response.data[0];
          setHotelCoords([parseFloat(lat), parseFloat(lon)]);
        }
      } catch (err) {
        console.error("Failed to fetch coordinates:", err.message);
      }
    };

    fetchHotelCoords();
  }, [activeTrip?.hotelDetails?.name, activeTrip?.hotelDetails?.address]);

  useEffect(() => {
    const fetchAirportCoords = async () => {
      const rawArrival = activeTrip?.flightDetails?.return?.arrival || "";

      if (!rawArrival) return;

      const cleanAirport = rawArrival
        .split(" - ")[0]
        .replace(/\(.*?\)/g, "")
        .trim();
      console.log("Clean departure", cleanAirport);

      try {
        const airportRes = await axios.get(
          "https://nominatim.openstreetmap.org/search",
          {
            params: {
              q: cleanAirport,
              format: "json",
              limit: 1,
              addressDetails: 1,
            },
          }
        );

        console.log("Response from flight coordinates: )", airportRes);

        if (airportRes.data.length > 0) {
          const { lat, lon } = airportRes.data[0];
          setAirportCoords([parseFloat(lat), parseFloat(lon)]);
        }
      } catch (err) {
        console.error("Airport geocoding failed:", err.message);
      }
    };

    fetchAirportCoords();
  }, [activeTrip?.flightDetails?.return?.arrival]);

  const defaultCenter = [45.4642, 9.19];
  const mapCenter = hotelCoords || airportCoords || defaultCenter;

  return (
    <MapContainer
      center={mapCenter}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "500px", width: "100%" }}
      className="rounded-2xl"
    >
      <TileLayer
        attribution='Map tiles by <a href="http://stamen.com">Stamen</a>'
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
      />

      {hotelCoords && (
        <Marker position={hotelCoords}>
          <Popup>{activeTrip.hotelDetails.name}</Popup>
        </Marker>
      )}
      {airportCoords && (
        <Marker position={airportCoords}>
          <Popup>
            {activeTrip.flightDetails?.return?.arrival?.split(" - ")[0]} Airport
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}

export default DynamicTripMap;
