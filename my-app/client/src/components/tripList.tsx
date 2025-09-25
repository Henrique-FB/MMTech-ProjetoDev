import React from "react";
import type { TripHeader } from "../types/trip.interface";

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
    <div
      style={{
        width: "300px",
        borderRight: "1px solid #ccc",
        padding: "1rem",
        overflowY: "auto",
      }}
    >
      {trips.length === 0 ? (
        <button onClick={onAddTrip}>Add Trip</button>
      ) : (
        <>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {trips.map((trip) => (
              <li
                key={trip.id}
                onClick={() => onSelectTrip(trip.id)}
                style={{
                  cursor: "pointer",
                  fontWeight: selectedTripId === trip.id ? "bold" : "normal",
                  marginBottom: "0.5rem",
                }}
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