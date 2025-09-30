import type { Trip, TripHeader, Stop } from "../../types/trip.interface";

// Fetch all trips
export const getAllTripHeaders = async (): Promise<TripHeader[]> => {
  const res = await fetch("http://localhost:5000/trips ", {
    method: "GET",
  });
  if (!res.ok) throw new Error("Failed to fetch trips");
  return res.json();
};

// Create a new trip
export const createTrip = async (): Promise<TripHeader> => {
  const res = await fetch("http://localhost:5000/trips", {
    method: "POST",
  });
  if (!res.ok) throw new Error("Failed to create trip");
  return res.json();
};

export const getTrip = async (tripId: number): Promise<Trip> => {
  const res = await fetch(`http://localhost:5000/trips/${tripId}`, {
    method: "GET",
  });
  if (!res.ok) throw new Error("Failed to fetch trip");
  return res.json();
}

export const deleteTrip = async (tripId: number): Promise<void> => {
  const res = await fetch(`http://localhost:5000/trips/${tripId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete trip");
}

export const renameTrip = async (tripId: number, newName: string): Promise<void> => {
  const res = await fetch(`http://localhost:5000/trips/${tripId}/rename`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ "name": newName }),
  });
  if (!res.ok) throw new Error("Failed to rename trip");
}
// === STOPS ===

export const addStop = async (tripId: number, cityId: number): Promise<Stop> => {
  const res = await fetch(`http://localhost:5000/trips/${tripId}/stops`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cityId }),
  });
  if (!res.ok) throw new Error("Failed to add stop");
  return res.json();
};

export const deleteStop = async (tripId: number, stopId: number): Promise<void> => {
  const res = await fetch(`http://localhost:5000/trips/${tripId}/stops/${stopId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete stop");
}

export const reorderStops = async (tripId: number, newOrder: number[]): Promise<void> => {

  const res = await fetch(`http://localhost:5000/trips/${tripId}/stops/reorder`, {
    method: "POST",
    headers: {
    "Content-Type": "application/json", // important
    },
    body: JSON.stringify({ "stopOrder": newOrder }),
  });

  console.log("Reordering stops...");


  if (!res.ok) throw new Error("Failed to reorder stops");
};

// === PATH ===

export const getTripPath = async (tripId: number): Promise<{points: string}> => {
  console.log("Fetching trip path...");
  const res = await fetch(`http://localhost:5000/trips/${tripId}/path`, {
    method: "GET",
  });
  if (!res.ok) throw new Error("Failed to fetch trip path");
  return res.json();
}
