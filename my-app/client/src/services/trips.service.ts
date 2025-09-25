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



// === STOPS ===




export const getStopsForTrip = async (tripId: number): Promise<any[]> => {
  const res = await fetch(`http://localhost:5000/trips/${tripId}/stops`, {
    method: "GET",
  });
  if (!res.ok) throw new Error("Failed to fetch stops");
  return res.json();
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
