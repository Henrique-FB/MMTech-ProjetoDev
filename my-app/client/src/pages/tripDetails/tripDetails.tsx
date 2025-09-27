import React, {useState, useEffect}  from "react";
import "./tripDetails.css"
import type { Trip } from "../../types/trip.interface";
import * as tripService from "../../services/api/trips.service";
import TripTitle from "../../components/tripTitle/tripTitle";
import TripList from "../../components/stopList/stopList";
import TripConfig from "../../components/tripConfig/tripConfig";


interface Props {
  trip: Trip | null;
  onDeleteTrip: (tripId: number) => void;
  setTripHeaders: React.Dispatch<React.SetStateAction<{ id: number; name: string | null; }[]>>;
}

export default function TripDetails({ trip, onDeleteTrip, setTripHeaders }: Props) {
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
        <p>Number of stops: {trip.stops.length}</p>
      </div>

      <div className="trip-main">
        <div className="trip-map">
          {/* Map goes here */}
        </div>

        <TripList trip={trip} />
      </div>
    </div>
  );
}
