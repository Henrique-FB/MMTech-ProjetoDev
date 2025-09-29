import express from "express";
import cors from "cors";
import tripRoutes from "./routes/trip.routes";
import cityRoutes from "./routes/cities.routes";
import type { Request, Response } from "express";


const app = express();
app.use(express.json());
app.use(cors());
app.use("/trips", tripRoutes);
app.use("/cities", cityRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

