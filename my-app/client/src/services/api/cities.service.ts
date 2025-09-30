import type { City } from "../../types/trip.interface";

export const getCities = async (): Promise<City[]> => {
    console.log("Fetching cities...");
  const res = await fetch(`http://localhost:5000/cities`, {
    method: "GET",
    });
    if (!res.ok) throw new Error("Failed to fetch cities");
    return res.json();
};
