import db from "../models/index.js";
import { Request,  Response } from "express";
const Organizers = db.Organizers;

export const getAllOrganizers = async (req:Request, res:Response) => {
  try {
    res.json(await Organizers.findAll());
  } catch (e) {
    const error = e as Error;
    res.status(500).json({ error: error.message }); }
};

export const getOrganizerById = async (req:Request, res:Response) => {
  try {
    const org = await Organizers.findByPk(req.params.id);
    if (!org) return res.status(404).json({ error: "Organizer not found" });
    res.json(org);
  } catch (e) {
    const error = e as Error;
    res.status(500).json({ error: error.message }); }
};

export const createOrganizer = async (req:Request, res:Response) => {
  try {
    res.status(201).json(await Organizers.create(req.body));
  } catch (e) {
    const error = e as Error;
    res.status(500).json({ error: error.message }); }
};

export const updateOrganizer = async (req:Request, res:Response) => {
  try {
    const org = await Organizers.findByPk(req.params.id);
    if (!org) return res.status(404).json({ error: "Organizer not found" });
    await org.update(req.body);
    res.json(org);
  } catch (e) {
    const error = e as Error;
    res.status(500).json({ error: error.message }); }
};

//Hard Delete
export const hardDeleteOrganizer = async (req:Request, res:Response) => {
  try {
    const org = await Organizers.findByPk(req.params.id);
    if (!org) return res.status(404).json({ error: "Organizer not found" });
    await org.destroy();
    res.json({ message: "Organizer removed" });
  } catch (e) {
    const error = e as Error;
    res.status(500).json({ error: error.message }); }
};
