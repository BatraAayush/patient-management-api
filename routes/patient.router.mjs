import express from "express";
import {
  getAllPatients,
  addPatient,
  updatePatient,
  deletePatient,
} from "../controllers/patient.controller.mjs";

const patientRouter = express.Router();

patientRouter.get("/patients", async (req, res) => {
  try {
    const patients = await getAllPatients();

    if (!patients) {
      res.status(404).json({ error: "Error fetching all patients" });
    }

    res
      .status(200)
      .json({
        message: "All patients fetched successfully",
        patients: patients,
      });
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch all patients" });
  }
});

patientRouter.post("/patients", async (req, res) => {
  try {
    const patientData = req.body;
    const addedPatient = await addPatient(patientData);

    if (!addedPatient) {
      res.status(404).json({ error: "Error adding new patient" });
    }

    res
      .status(201)
      .json({
        message: "New patient added successfully",
        patient: addedPatient,
      });
  } catch (error) {
    res.status(500).json({ error: "Unable to add new patient" });
  }
});

patientRouter.put("/patients/:patientId", async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const patientData = req.body;
    const updatedPatient = await updatePatient(patientId, patientData);

    if (!updatedPatient) {
      res.status(404).json({ error: "Patient not found" });
    }

    res
      .status(201)
      .json({
        message: "Patient updated successfully",
        patient: updatedPatient,
      });
  } catch (error) {
    res.status(500).json({ error: "Unable to update patient", error });
  }
});

patientRouter.delete("/patients/:patientId", async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const deletedPatient = await deletePatient(patientId);

    if (!deletedPatient) {
      res.status(404).json({ error: "Patient not found" });
    }

    res
      .status(201)
      .json({
        message: "Patient deleted successfully",
        patient: deletedPatient,
      });
  } catch (error) {
    res.status(500).json({ error: "Unable to delete patient", error });
  }
});

export { patientRouter };
