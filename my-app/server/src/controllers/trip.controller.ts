import type { Request, Response } from "express";
import * as tripService from "../services/trip.service";

export const getTrip = (req: Request, res: Response) => {
  const tripId = parseInt(req.params.tripId, 10);
  tripService.getTrip(tripId)
    .then((trip) => {
      if (trip) {
        res.status(200).json(trip);
      } else {
        res.status(404).json({ error: "Trip not found" });
      }
    })
    .catch((error) => {
      console.error("Error fetching trip:", error);
      res.status(500).json({ error: "Failed to fetch trip" });
    });
};

export const getAllTrips = async (req: Request, res: Response) => {
  try {
    const trips = await tripService.getAllTrips();
    res.status(200).json(trips);
  } catch (error) {
    console.error("Error fetching trips:", error);
    res.status(500).json({ error: "Failed to fetch trips" });
  }
};

export const createTrip = async (req: Request, res: Response) => {
  try {
    const trip = await tripService.createTrip();
    res.status(201).json(trip);
  } catch (error) {
    console.error("Error creating trip:", error);
    res.status(500).json({ error: "Failed to create trip" });
  }
};

export const deleteTrip = async (req: Request, res: Response) => {
  const tripId = parseInt(req.params.tripId, 10);
  try {
    await tripService.deleteTrip(tripId);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting trip:", error);
    res.status(500).json({ error: "Failed to delete trip" });
  }
};    


export const getAllStops = async (req: Request, res: Response) => {
  const tripId = parseInt(req.params.tripId, 10);
  try {
    const stops = await tripService.getAllStops(tripId);
    res.status(200).json(stops);
  } catch (error) {
    console.error("Error fetching stops:", error);
    res.status(500).json({ error: "Failed to fetch stops" });
  }
}

export const reorderStops = async (req: Request, res: Response) => {
  const tripId = parseInt(req.params.tripId, 10);
  const { stopOrder } = req.body; // Expecting an array of stop IDs in the new order

  console.log(tripId, stopOrder);

  try {
    await tripService.reorderStops(tripId, stopOrder);
    res.status(204).send();
  } catch (error) {
    console.error("Error reordering stops:", error);
    res.status(500).json({ error: "Failed to reorder stops" });
  }
}