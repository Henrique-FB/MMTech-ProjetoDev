import { Router } from "express";
import * as tripController from "../controllers/trip.controller";

const router = Router();

// Create Delete Read trips
router.get("/", tripController.getAllTrips);
router.post("/", tripController.createTrip);
router.delete("/:tripId", tripController.deleteTrip);
router.get("/:tripId", tripController.getTrip);
router.put("/:tripId/rename", tripController.renameTrip);

// Create Delete Read stops
router.post("/:tripId/stops", tripController.addStop);
router.delete("/:tripId/stops/:stopId", tripController.deleteStop);
router.post("/:tripId/stops/reorder", tripController.reorderStops);


export default router;