import React from "react";
import type { TripHeader } from "../../types/trip.interface";
import "./tripList.css"

interface Props {
  trips: TripHeader[];
  selectedTripId: number | null;
  onSelectTrip: (id: number) => void;
  onAddTrip: () => void;
}

export default function TripList({
  trips,
  selectedTripId,
  onSelectTrip,
  onAddTrip,
}: Props) {
  return (
    <div className="trip-list">
  {trips.length === 0 ? (
    <button onClick={onAddTrip}>Add Trip</button>
  ) : (
    <>
      <ul>
        {trips.map((trip) => (
          <li
            key={trip.id}
            className={selectedTripId === trip.id ? "selected" : ""}
            onClick={() => onSelectTrip(trip.id)}
          >
            {trip.name ?? `Trip #${trip.id}`}
          </li>
        ))}
      </ul>
      <button onClick={onAddTrip}>Add Trip</button>
    </>
  )}
</div>
  );
}