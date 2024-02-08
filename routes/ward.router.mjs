import express from "express";
import {
  getAllWards,
  addWard,
  updateWard,
  deleteWard,
} from "../controllers/ward.controller.mjs";

const wardRouter = express.Router();

wardRouter.get("/wards", async (req, res) => {
  try {
    const wards = await getAllWards();

    if (!wards) {
      res.status(404).json({ error: "Error fetching all wards" });
    }

    res
      .status(201)
      .json({ message: "All wards fetched successfully", wards: wards });
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch all wards", error });
  }
});

wardRouter.post("/wards", async (req, res) => {
  try {
    const wardData = req.body;
    const addedWard = await addWard(wardData);

    if (!addedWard) {
      res.status(404).json({ error: "Error adding new ward" });
    }

    res
      .status(201)
      .json({ message: "New ward added successfully", ward: addedWard });
  } catch (error) {
    res.status(500).json({ error: "Unable to add new ward", error });
  }
});

wardRouter.put("/wards/:wardId", async (req, res) => {
  try {
    const wardId = req.params.wardId;
    const wardData = req.body;
    const updatedWard = await updateWard(wardId, wardData);

    if (!updatedWard) {
      res.status(404).json({ error: "Ward not found" });
    }

    res
      .status(201)
      .json({ message: "Ward updated successfully", ward: updatedWard });
  } catch (error) {
    res.status(500).json({ error: "Unable to update ward", error });
  }
});

wardRouter.delete("/wards/:wardId", async (req, res) => {
  try {
    const wardId = req.params.wardId;
    const deletedWard = await deleteWard(wardId);

    if (!deletedWard) {
      res.status(404).json({ error: "Ward not found" });
    }

    res
      .status(201)
      .json({ message: "Ward deleted successfully", ward: deletedWard });
  } catch (error) {
    res.status(500).json({ error: "Unable to delete ward", error });
  }
});

export { wardRouter };
