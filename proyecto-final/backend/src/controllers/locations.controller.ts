import db from "../models/index.js";
import { Request,  Response } from "express";
const Locations = db.Locations;

export const getAllLocations = async (req:Request, res:Response) => {
  try {
    res.json(await Locations.findAll());
  } catch (e) {
    const error = e as Error;
    res.status(500).json({ error: error.message }); }
};

export const getLocationById = async (req:Request, res:Response) => {
  try {
    const row = await Locations.findByPk(req.params.id);
    if (!row) return res.status(404).json({ error: "Location not found" });
    res.json(row);
  } catch (e) {
    const error = e as Error;
    res.status(500).json({ error: error.message }); }
};

export const createLocation = async (req:Request, res:Response) => {
  try {
    const row = await Locations.create(req.body);
    res.status(201).json(row);
  } catch (e) {
    const error = e as Error;
    res.status(500).json({ error: error.message }); }
};

export const updateLocation = async (req:Request, res:Response) => {
  try {
    const row = await Locations.findByPk(req.params.id);
    if (!row) return res.status(404).json({ error: "Location not found" });
    await row.update(req.body);
    res.json(row);
  } catch (e) {
    const error = e as Error;
    res.status(500).json({ error: error.message }); }
};


// Hard delete de la Location
export const hardDeleteLocation = async (req:Request, res:Response) => {
  try {
    const row = await Locations.findByPk(req.params.id);
    if (!row) return res.status(404).json({ error: "FAQ not found" });
    await row.destroy();
    res.json({ message: "Location removed (hard delete)" });
  } catch (e) {
    const error = e as Error;
    res.status(500).json({ error: error.message }); }
};

//Soft Delete
export const softDeleteLocation = async (req:Request, res:Response) => {
  try {
    const row = await Locations.findByPk(req.params.id);
    if (!row) return res.status(404).json({ error: "Location not found" });
    await row.update({ deleted: true, deleted_at: new Date() });
    res.json({ message: "Location deleted logically" });
  } catch (e) {
    const error = e as Error;
    res.status(500).json({ error: error.message }); }
};
