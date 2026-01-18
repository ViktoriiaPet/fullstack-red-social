import db from "../models/index.js";
import { Request,  Response } from "express";
const Messages = db.Messages;

export const getAllMessages = async (req:Request, res:Response)=> {
  try {
    res.json(await Messages.findAll());
  } catch (e) {
    const error = e as Error;
    res.status(500).json({ error: error.message }); }
};

export const getMessageById = async (req:Request, res:Response)=> {
  try {
    const row = await Messages.findByPk(req.params.id);
    if (!row) return res.status(404).json({ error: "Message not found" });
    res.json(row);
  } catch (e) {
    const error = e as Error;
    res.status(500).json({ error: error.message }); }
};

export const createMessage = async (req:Request, res:Response)=> {
  try {
    res.status(201).json(await Messages.create(req.body));
  } catch (e) {
    const error = e as Error;
    res.status(500).json({ error: error.message }); }
};

export const updateMessage = async (req:Request, res:Response)=> {
  try {
    const row = await Messages.findByPk(req.params.id);
    if (!row) return res.status(404).json({ error: "Message not found" });
    await row.update(req.body);
    res.json(row);
  } catch (e) {
    const error = e as Error;
    res.status(500).json({ error: error.message }); }
};

//Hard Delete
export const hardDeleteMessage = async (req:Request, res:Response)=> {
  try {
    const row = await Messages.findByPk(req.params.id);
    if (!row) return res.status(404).json({ error: "Message not found" });
    await row.destroy();
    res.json({ message: "Message removed" });
  } catch (e) {
    const error = e as Error;
     res.status(500).json({ error: error.message }); }
};
