import db from "../models/index.js";
import { Request,  Response } from "express";
const Notifications = db.Notifications;

export const getAllNotifications = async (req:Request, res:Response) => {
  try {
    res.json(await Notifications.findAll());
  } catch (e) {
    const error = e as Error;
    res.status(500).json({ error: error.message }); }
};

export const getNotificationById = async (req:Request, res:Response) => {
  try {
    const n = await Notifications.findByPk(req.params.id);
    if (!n) return res.status(404).json({ error: "Notification not found" });
    res.json(n);
  } catch (e) { 
    const error = e as Error;
    res.status(500).json({ error: error.message }); }
};

export const createNotification = async (req:Request, res:Response) => {
  try {
    res.status(201).json(await Notifications.create(req.body));
  } catch (e) {
    const error = e as Error;
    res.status(500).json({ error: error.message }); }
};

export const updateNotification = async (req:Request, res:Response) => {
  try {
    const n = await Notifications.findByPk(req.params.id);
    if (!n) return res.status(404).json({ error: "Notification not found" });
    await n.update(req.body);
    res.json(n);
  } catch (e) {
    const error = e as Error;
    res.status(500).json({ error: error.message }); }
};

export const hardDeleteNotification = async (req:Request, res:Response) => {
  try {
    const n = await Notifications.findByPk(req.params.id);
    if (!n) return res.status(404).json({ error: "Notification not found" });

    await n.destroy();
    res.json({ message: "Notification removed" });
  } catch (e) {
    const error = e as Error;
    res.status(500).json({ error: error.message }); }
};
