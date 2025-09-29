
import { Router } from "express";
import * as tripController from "../controllers/trip.controller";


const router = Router();

router.get("/", tripController.getAllCities);


export default router;