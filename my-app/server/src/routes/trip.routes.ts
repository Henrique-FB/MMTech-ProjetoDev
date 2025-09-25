import { Router } from "express";
import * as tripController from "../controllers/trip.controller";
import { getAllStops } from "../services/trip.service";

const router = Router();

// Create Delete Read trips
router.get("/", tripController.getAllTrips);
router.post("/", tripController.createTrip);
router.delete("/:tripId", tripController.deleteTrip);
router.get("/:tripId", tripController.getTrip);

// Create Delete Read stops
//router.post("/:tripId/stops", addStop);
//router.delete("/:tripId/stops/:stopId", deleteStop);
router.get("/:tripId/stops", tripController.getAllStops);
// reorder stops
router.post("/:tripId/stops/reorder", tripController.reorderStops);


export default router;