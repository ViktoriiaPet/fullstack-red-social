import db from "../models/index.js";
import { Request,  Response } from "express";

const Permissions = db.Permissions;

export const getAllPermissions = async (req:Request, res:Response) => {
  try {
    res.json(await Permissions.findAll());
  } catch (e) {
    const error = e as Error;
    res.status(500).json({ error: error.message }); }
};

export const getPermissionById = async (req:Request, res:Response) => {
  try {
    const row = await Permissions.findByPk(req.params.id);
    if (!row) return res.status(404).json({ error: "Permission not found" });
    res.json(row);
  } catch (e) {
    const error = e as Error;
    res.status(500).json({ error: error.message }); }
};

export const createPermission = async (req:Request, res:Response) => {
  try {
    res.status(201).json(await Permissions.create(req.body));
  } catch (e) {
    const error = e as Error;
    res.status(500).json({ error: error.message }); }
};

export const updatePermission = async (req:Request, res:Response) => {
  try {
    const row = await Permissions.findByPk(req.params.id);
    if (!row) return res.status(404).json({ error: "Permission not found" });
    await row.update(req.body);
    res.json(row);
  } catch (e) {
    const error = e as Error;
    res.status(500).json({ error: error.message }); }
};

//HardDelete
export const hardDeletePermission = async (req:Request, res:Response) => {
  try {
    const row = await Permissions.findByPk(req.params.id);
    if (!row) return res.status(404).json({ error: "Permission not found" });
    await row.destroy();
    res.json({ message: "Permission removed" });
  } catch (e) {
    const error = e as Error;
    res.status(500).json({ error: error.message }); }
};
