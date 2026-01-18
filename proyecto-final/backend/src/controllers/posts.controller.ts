import db from "../models/index.js";
import { Request,  Response } from "express";

const Posts = db.Posts;

export const getAllPosts = async (req:Request, res:Response) => {
  try {
    res.json(await Posts.findAll());
  } catch (e) {
    const error = e as Error;
    res.status(500).json({ error: error.message }); }
};

export const getPostById = async (req:Request, res:Response) => {
  try {
    const row = await Posts.findByPk(req.params.id);
    if (!row) return res.status(404).json({ error: "Post not found" });
    res.json(row);
  } catch (e) {
    const error = e as Error;
     res.status(500).json({ error: error.message }); }

};

export const createPost = async (req:Request, res:Response) => {
  try {
    res.status(201).json(await Posts.create(req.body));
  } catch (e) { 
    const error = e as Error;
    res.status(500).json({ error: error.message }); }
};

export const updatePost = async (req:Request, res:Response) => {
  try {
    const row = await Posts.findByPk(req.params.id);
    if (!row) return res.status(404).json({ error: "Post not found" });
    await row.update(req.body);
    res.json(row);
  } catch (e) { 
    const error = e as Error;
    res.status(500).json({ error: error.message }); }
};

// Hard delete del Post
export const hardDeletePost = async (req:Request, res:Response) => {
  try {
    const row = await Posts.findByPk(req.params.id);
    if (!row) return res.status(404).json({ error: "Post not found" });
    await row.destroy();
    res.json({ message: "Post removed (hard delete)" });
  } catch (e) {
    const error = e as Error;
    res.status(500).json({ error: error.message }); }
};

//Soft Delete
export const softDeletePost = async (req:Request, res:Response) => {
  try {
    const row = await Posts.findByPk(req.params.id);
    if (!row) return res.status(404).json({ error: "Post not found" });
    await row.update({ borrado: true, deleted_at: new Date() });
    res.json({ message: "Post deleted logically" });
  } catch (e) {
    const error = e as Error;
    res.status(500).json({ error: error.message }); }
};
