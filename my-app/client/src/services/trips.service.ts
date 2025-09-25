export interface Stop {
  id: number;
  cityName: string;
  latitude: number;
  longitude: number;
}

import type { Trip, TripHeader } from "../types/trip.interface";

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


// === STOPS ===

export const addStop = async (tripId: number, cityId: number): Promise<void> => {
  const res = await fetch(`http://localhost:5000/trips/${tripId}/stops`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cityId }),
  });
  if (!res.ok) throw new Error("Failed to add stop");
};

export const reorderStops = async (tripId: number, newOrder: number[]): Promise<void> => {
  const res = await fetch(`http://localhost:5000/trips/${tripId}/stops/reorder`, {
    method: "POST",
    headers: {
    "Content-Type": "application/json", // important
    },
    body: JSON.stringify({ "stopOrder": newOrder }),
  });
  if (!res.ok) throw new Error("Failed to reorder stops");
};
