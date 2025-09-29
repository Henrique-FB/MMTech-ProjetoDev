import type { Request, Response } from "express";
import * as tripService from "../services/trip.service";
import type { Stop, City } from "../interfaces/trip.interface";


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

export const renameTrip = async (req: Request, res: Response) => {
  const tripId = parseInt(req.params.tripId, 10);
  const { name } = req.body;
  try {
    const updatedTrip = await tripService.renameTrip(tripId, name);
    res.status(200).json(updatedTrip);
  } catch (error) {
    console.error("Error renaming trip:", error);
    res.status(500).json({ error: "Failed to rename trip" });
  }
};

export const reorderStops = async (req: Request, res: Response) => {
  const tripId = parseInt(req.params.tripId, 10);
  const { stopOrder } = req.body; // Expecting an array of stop IDs in the new order

  console.log(tripId, stopOrder);

  try {
    await tripService.reorderStops(tripId, stopOrder);
    await tripService.updateTripPath(tripId);
    res.status(204).send();
  } catch (error) {
    console.error("Error reordering stops:", error);
    res.status(500).json({ error: "Failed to reorder stops" });
  }
}

export const addStop = async (req: Request, res: Response) => {
  const tripId = parseInt(req.params.tripId, 10);
  const { cityId } = req.body;
  
  console.log(tripId, cityId);

  try {
    const result = await tripService.addStop(tripId, { cityId });
    const newStop: Stop = await tripService.getStopById(result.id);
    
    await tripService.updateTripPath(tripId);

    res.status(201).json(newStop);
    console.log(newStop);
  } catch (error) {
    console.error("Error adding stop:", error);
    res.status(500).json({ error: "Failed to add stop" });
  }
};

export const deleteStop = async (req: Request, res: Response) => {
  const stopId = parseInt(req.params.stopId, 10);
  const tripId = parseInt(req.params.tripId, 10);
  console.log('test')
  try {
    await tripService.deleteStop(stopId);
    await tripService.updateTripPath(tripId);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting stop:", error);
    res.status(500).json({ error: "Failed to delete stop" });
  }
};


export const getAllCities = async (req: Request, res: Response) => {
  console.log("Fetching cities...");

  try {
    const cities: City[] = await tripService.getAllCities();
    res.status(200).json(cities);
  } catch (error) {
    console.error("Error fetching cities:", error);
    res.status(500).json({ error: "Failed to fetch cities" });
  }
};


// Pathing using google maps API

export const getTripPath = async (req: Request, res: Response) => {
  const tripId = parseInt(req.params.tripId, 10);

  try {
    const result = await tripService.getTripPath(tripId);

    // get list of latitudes and longitudes from result
    const path = { points: result.polyline_points };
    console.log(path);
    res.status(200).json(path);
  } catch (error) {
    console.error("Error fetching trip path:", error);
    res.status(500).json({ error: "Failed to fetch trip path" });
  }
};
