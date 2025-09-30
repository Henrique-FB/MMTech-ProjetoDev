import React, {useState, useEffect}  from "react";
import "./tripDetails.css"
import type { Trip } from "../../types/trip.interface";
import type { Stop } from "../../types/trip.interface";
import * as tripService from "../../services/api/trips.service";
import TripTitle from "../../components/tripTitle/tripTitle";
import StopList from "../../components/stopList/stopList";
import TripConfig from "../../components/tripConfig/tripConfig";
import type { TripHeader } from "../../types/trip.interface";
import TripMap from "../../components/tripMap/tripMap";

interface Props {
  trip: Trip | null;
  onDeleteTrip: (tripId: number) => void;
  setTripHeaders: React.Dispatch<React.SetStateAction<TripHeader[]>>;
}

export default function TripDetails({ trip, onDeleteTrip, setTripHeaders }: Props) {

  const [stops, setStops] = useState<Stop[]>(trip?.stops || []);
  const [encodedRoute, setEncodedRoute] = useState<string>("");
  const [coords, setCoords] = useState<[number, number][]>([]);

  const [distances, setDistances] = useState<number[]>(trip?.full_distance || []);
  const [durations, setDurations] = useState<number[]>(trip?.full_duration || []);


  
  useEffect(() => {
    if (trip) {
      setStops(trip.stops);
      tripService.getTripPath(trip.id).then((res) => setEncodedRoute(res.points));
    }
  }, [trip]);

  useEffect(() => {
    if (trip) {
      tripService.getTrip(trip.id).then((updatedTrip) => {
        setDistances(updatedTrip.full_distance);
        setDurations(updatedTrip.full_duration);
      });
    }
  }, [trip, stops]);


  if (!trip) {
    return (
      <div className="empty-trip">
        <h2>No trip selected</h2>
        <p>Please choose a trip from the list on the left.</p>
      </div>
    );
  }

  return (
    <div className="trip-details">
      <div className="trip-header">
        <TripTitle
          trip={trip}
          onRename={async (newName) => {
            await tripService.renameTrip(trip.id, newName);
            setTripHeaders((prev) =>
              prev.map((t) => (t.id === trip.id ? { ...t, name: newName } : t))
            );
          }}
        />
        <TripConfig onDeleteTrip={() => onDeleteTrip(trip.id)} />
      </div>

      <div className="trip-description">

      </div>

      <div className="trip-main">
        <div className="trip-map">
          <TripMap trip={trip} stops={stops} setStops={setStops} encodedRoute={encodedRoute} setEncodedRoute={setEncodedRoute} coords={coords} setCoords={setCoords} distances={distances} durations={durations} />
        </div>

        <StopList trip={trip} stops={stops} setStops={setStops} encodedRoute={encodedRoute} setEncodedRoute={setEncodedRoute} />
      </div>
    </div>
  );
}
