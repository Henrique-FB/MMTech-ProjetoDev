import express from "express";
import cors from "cors";
import type { Request, Response } from "express";


const app = express();
app.use(cors());

app.get("/api/hello", (req: Request, res: Response) => {
  res.json({ message: "Hello from Node + TypeScript!" });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));