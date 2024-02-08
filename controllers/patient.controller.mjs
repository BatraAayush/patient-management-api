import mongoose from "mongoose";
import { Patient } from "../models/patient.model.mjs";

const getAllPatients = async () => {
  try {
    const patients = await Patient.find().populate({
      path: "ward",
      select: "wardNumber capacity specialization",
    });

    return patients;
  } catch (error) {
    throw error;
  }
};

const addPatient = async (patientData) => {
  try {
    const patient = new Patient(patientData);

    const populatedPatient = await patient.populate({
      path: "ward",
      select: "wardNumber capacity specialization",
    });

    const addedPatient = await populatedPatient.save();

    return addedPatient;
  } catch (error) {
    throw error;
  }
};

const updatePatient = async (patientId, patientData) => {
  try {
    const patient = await Patient.findByIdAndUpdate(patientId, patientData, {
      new: true,
    }).populate({
      path: "ward",
      select: "wardNumber capacity specialization",
    });

    return patient;
  } catch (error) {
    throw error;
  }
};

const deletePatient = async (patientId) => {
  try {
    const patient = await Patient.findByIdAndDelete(patientId);

    return patient;
  } catch (error) {
    throw error;
  }
};

export { getAllPatients, addPatient, updatePatient, deletePatient };
