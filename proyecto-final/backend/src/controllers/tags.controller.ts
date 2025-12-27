import db from "../models/index.js";
import { Request,  Response } from "express";
const Tags = db.Tags;

export const getAllTags = async (req:Request, res:Response) => {
  try {
    res.json(await Tags.findAll());
  } catch (e) {
    const error = e as Error;
    res.status(500).json({ error: error.message }); }
};

export const getTagById = async (req:Request, res:Response) => {
  try {
    const row = await Tags.findByPk(req.params.id);
    if (!row) return res.status(404).json({ error: "Tag not found" });
    res.json(row);
  } catch (e) {
    const error = e as Error;
    res.status(500).json({ error: error.message }); }
};

export const createTag = async (req:Request, res:Response) => {
  try {
    const row = await Tags.create(req.body);
    res.status(201).json(row);
  } catch (e) { 
    const error = e as Error;
    res.status(500).json({ error: error.message }); }
};

export const updateTag = async (req:Request, res:Response) => {
  try {
    const row = await Tags.findByPk(req.params.id);
    if (!row) return res.status(404).json({ error: "Tag not found" });
    await row.update(req.body);
    res.json(row);
  } catch (e) {
    const error = e as Error;
    res.status(500).json({ error: error.message }); }
};

//Hard Delete
export const hardDeleteTag = async (req:Request, res:Response) => {
  try {
    const row = await Tags.findByPk(req.params.id);
    if (!row) return res.status(404).json({ error: "Tag not found" });
    await row.destroy();
    res.json({ message: "Tag removed" });
  } catch (e) {
    const error = e as Error;
    res.status(500).json({ error: error.message }); }
};
