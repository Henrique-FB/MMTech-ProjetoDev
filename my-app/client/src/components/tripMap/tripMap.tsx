import { useEffect, useState } from "react";
import type { Stop, Trip } from "../../types/trip.interface";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import polyline from "polyline";
import { Polyline } from "react-leaflet";

export default function TripMap({ trip, stops, setStops, encodedRoute, setEncodedRoute, coords, setCoords }: { trip: Trip; stops: Stop[]; setStops: React.Dispatch<React.SetStateAction<Stop[]>>; encodedRoute: string; setEncodedRoute: React.Dispatch<React.SetStateAction<string>>; coords: [number, number][]; setCoords: React.Dispatch<React.SetStateAction<[number, number][]>> }) {

    useEffect(() => {
        setStops(trip.stops);
    }, [trip]);

    useEffect(() => {
      if (encodedRoute) {
        const decoded = polyline.decode(encodedRoute) as [number, number][];
        setCoords(decoded);
      }
      else{
        setCoords([]);
      }
    }, [encodedRoute]);

    function RecenterMap({ stops }: { stops: Stop[] }) {
        const map = useMap();

        useEffect(() => {
            if (stops.length > 0) {
                map.setView([stops[0].city.latitude, stops[0].city.longitude], 6 ,);
            }
        }, [stops, map]);

        return null;
    }


    return (
    <MapContainer center={[stops[0]?.city.latitude || 0, stops[0]?.city.longitude || 0]} zoom={6} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {stops.map((stop) => (
        <Marker key={stop.id} position={[stop.city.latitude, stop.city.longitude]}>
          <Popup>
            {stop.city.name} ({stop.city.uf})
          </Popup>
        </Marker>
      ))}
        <Polyline positions={coords} color="blue" />
        <RecenterMap stops={stops} />
    </MapContainer>
  );
}