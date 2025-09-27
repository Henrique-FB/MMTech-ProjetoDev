import React, { useState, useEffect } from "react";
import type { TripHeader } from "./types/trip.interface";
import type { Trip } from "./types/trip.interface";
import { getAllTripHeaders, createTrip, getTrip, deleteTrip } from "./services/api/trips.service";
import TripList from "./pages/tripList/tripList";
import TripDetails from "./pages/tripDetails/tripDetails";

import * as tripService from "./services/api/trips.service";

export default function App() {
  const [tripHeaders, setTripHeaders] = useState<TripHeader[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);

  // load all trip headers when app starts
  useEffect(() => {
    getAllTripHeaders().then(setTripHeaders).catch(console.error);
  }, []);

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

  const handleSelectTrip = async (id: number) => {
    try {
      const trip = await getTrip(id);
      setSelectedTrip(trip);
    } catch (err) {
      console.error(err);
      alert("Failed to load trip info");
    }
  };

  const handleDeleteTrip = async (tripId: number) => {
    await tripService.deleteTrip(tripId);
    setTripHeaders((prev) => prev.filter((t) => t.id !== tripId));
    setSelectedTrip((prev) => (prev?.id === tripId ? null : prev));
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", alignItems: "stretch" }}>
      <TripList
        trips={tripHeaders}
        selectedTripId={selectedTrip?.id ?? null}
        onSelectTrip={handleSelectTrip}
        onAddTrip={handleCreateTrip}
      />
      <div style={{ flex: 1, display: "flex" }}>
        <TripDetails trip={selectedTrip} onDeleteTrip={handleDeleteTrip} setTripHeaders={setTripHeaders} />
      </div>
    </div>
  );
}