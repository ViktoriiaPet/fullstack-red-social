import db from "../models/index.js";
import { Request,  Response } from "express";

const Profiles = db.Profiles;

export const getAllProfiles = async (req:Request, res:Response) => {
  try {
    res.json(await Profiles.findAll());
  } catch (e) {
     const error = e as Error;
    res.status(500).json({ error: error.message }); }
};

export const getProfileById = async (req:Request, res:Response) => {
  try {
    const row = await Profiles.findByPk(req.params.id);
    if (!row) return res.status(404).json({ error: "Profile not found" });
    res.json(row);
  } catch (e) {
     const error = e as Error;
     res.status(500).json({ error: error.message }); }
};

export const createProfile = async (req:Request, res:Response) => {
  try {
    res.status(201).json(await Profiles.create(req.body));
  } catch (e) {
     const error = e as Error;
    res.status(500).json({ error: error.message }); }
};

export const updateProfile = async (req:Request, res:Response) => {
  try {
    const row = await Profiles.findByPk(req.params.id);
    if (!row) return res.status(404).json({ error: "Profile not found" });
    await row.update(req.body);
    res.json(row);
  } catch (e) {
     const error = e as Error;
    res.status(500).json({ error: error.message }); }
};

//Hard Delete
export const hardDeleteProfile = async (req:Request, res:Response) => {
  try {
    const row = await Profiles.findByPk(req.params.id);
    if (!row) return res.status(404).json({ error: "Profile not found" });
    await row.destroy();
    res.json({ message: "Profile removed" });
  } catch (e) {
     const error = e as Error;
    res.status(500).json({ error: error.message }); }
};
