import React, { useState, useEffect } from "react";
import type { TripHeader } from "./types/trip.interface";
import type { Trip } from "./types/trip.interface";
import { getAllTripHeaders, createTrip, getTrip } from "./services/trips.service";
import TripList from "./components/tripList";
import TripDetails from "./components/tripDetails/tripDetails";

export default function App() {
  const [tripHeaders, setTripHeaders] = useState<TripHeader[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);

  // load all trip headers when app starts
  useEffect(() => {
    getAllTripHeaders().then(setTripHeaders).catch(console.error);
  }, []);

  // create a new trip
  const handleCreateTrip = async () => {
    try {
      const newTrip = await createTrip();
      setTripHeaders((prev) => [...prev, { id: newTrip.id, name: newTrip.name }]);
      setSelectedTrip(await getTrip(newTrip.id)); // fetches full trip info from backend already
    } catch (err) {
      console.error(err);
      alert("Failed to create trip");
    }
  };

  // select a trip → fetch its full info
  const handleSelectTrip = async (id: number) => {
    try {
      const trip = await getTrip(id);
      setSelectedTrip(trip);
    } catch (err) {
      console.error(err);
      alert("Failed to load trip info");
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <TripList
        trips={tripHeaders}
        selectedTripId={selectedTrip?.id ?? null}
        onSelectTrip={handleSelectTrip}
        onAddTrip={handleCreateTrip}
      />
      <div style={{ flex: 1 }}>
        <TripDetails trip={selectedTrip} />
      </div>
    </div>
  );
}