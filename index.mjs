import "./db/db.connect.mjs";
import express from "express";
import cors from "cors";
import helmet from "helmet";

import { patientRouter } from "./routes/patient.router.mjs";
import { wardRouter } from "./routes/ward.router.mjs";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/api/v1", wardRouter);
app.use("/api/v1", patientRouter);

app.use("/", (err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({ error: "Something went wrong" });
});

app.use("/", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
