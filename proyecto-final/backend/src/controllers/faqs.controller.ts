import db from "../models/index.js";
const FAQs = db.FAQs;
import { Request,  Response } from "express";

export const getAllFAQs = async (req:Request, res:Response) => {
  try {
    res.json(await FAQs.findAll());
  } catch (e) {
    const error = e as Error;
     res.status(500).json({ error: error.message }); }
};

export const getFAQById = async (req:Request, res:Response) => {
  try {
    const row = await FAQs.findByPk(req.params.id);
    if (!row) return res.status(404).json({ error: "FAQ not found" });
    res.json(row);
  } catch (e) { 
    const error = e as Error;
    res.status(500).json({ error: error.message }); }
};

export const createFAQ = async (req:Request, res:Response) => {
  try {
    res.status(201).json(await FAQs.create(req.body));
  } catch (e) {
    const error = e as Error;
    res.status(500).json({ error: error.message }); }
};

export const updateFAQ = async (req:Request, res:Response) => {
  try {
    const row = await FAQs.findByPk(req.params.id);
    if (!row) return res.status(404).json({ error: "FAQ not found" });
    await row.update(req.body);
    res.json(row);
  } catch (e) {
    const error = e as Error;
    res.status(500).json({ error: error.message }); }
};

//Hard Delete
export const hardDeleteFAQ = async (req:Request, res:Response) => {
  try {
    const row = await FAQs.findByPk(req.params.id);
    if (!row) return res.status(404).json({ error: "FAQ not found" });
    await row.destroy();
    res.json({ message: "FAQ removed" });
  } catch (e) {
    const error = e as Error;
    res.status(500).json({ error: error.message }); }
};
