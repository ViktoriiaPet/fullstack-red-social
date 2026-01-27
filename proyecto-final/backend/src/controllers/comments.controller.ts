import db from "../models/index.js";
import { Request,  Response } from "express";
import { CommentInstance } from "../types/comment.js";
const Comments = db.Comments;


// Obtener todos los comentarios (incluye eliminados si se solicita)
export const getAllComments = async (req:Request, res:Response) => {
  try {
    const includeDeleted = req.query.includeDeleted === "true";

    const comments = await Comments.findAll({
      paranoid: !includeDeleted
    });

    res.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Error retrieving comments" });
  }
};

// Obtener un comentario por ID
export const getCommentById = async (req:Request, res:Response) => {
  try {
    const comment = await Comments.findByPk(req.params.idComment);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.json(comment);
  } catch (error) {
    console.error("Error fetching comment:", error);
    res.status(500).json({ error: "Error retrieving comment" });
  }
};

// Crear un comentario
export const createComment = async (req:Request, res:Response) => {
  console.log("CREATE COMMENT HIT", req.user);
  try {
    const { content } = req.body;

    const newComment = await Comments.create({  content,
  userId: req.user!.idUser });

    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "Error creating comment" });
  }
};

// Actualizar un comentario
export const updateComment = async (req:Request, res:Response) => {
  try {
    const { content } = req.body;

    const comment = await Comments.findByPk(req.params.id) as CommentInstance;

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    if (comment.userId !== req.user!.idUser && req.user!.role !== "admin") {
      return res.status(403).json({ error: "Not allowed" });
}


    await comment.update({ content });

    res.json(comment);
  } catch (error) {
    console.error("Error updating comment:", error);
    res.status(500).json({ error: "Error updating comment" });
  }
};

// Soft delete del comentario
export const softDeleteComment = async (req:Request, res:Response) => {
  
  try {
    console.log("PARAMS:", req.params);

    const comment = await Comments.findByPk(req.params.id) as CommentInstance;

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    if (comment.userId !== req.user!.idUser && req.user!.role !== "admin") {
    return res.status(403).json({ error: "Not allowed" });
}

    await comment.destroy();
    res.json({ message: "Comment deleted (soft delete applied)" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ error: "Error deleting comment" });
  }
};

// Hard delete del comentario
export const hardDeleteComment = async (req:Request, res:Response) => {
  try {
    const row = await Comments.findByPk(req.params.id);
    if (!row) return res.status(404).json({ error: "comment not found" });
    await row.destroy();
    res.json({ message: "Comment removed (hard delete)" });
  } catch (e) { 
    const error = e as Error;
    res.status(500).json({ error: error.message }); }
};


// Restaurar comentario eliminado (soft delete)
export const restoreComment = async (req:Request, res:Response) => {
  try {
    const comment = await Comments.findByPk(req.params.id, {
      paranoid: false
    }) as CommentInstance;

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    
    if (comment.userId !== req.user!.idUser && req.user!.role !== "admin") {
    return res.status(403).json({ error: "Not allowed" });
}
    await comment.restore();

    res.json({ message: "Comment restored" });
  } catch (error) {
    console.error("Error restoring comment:", error);
    res.status(500).json({ error: "Error restoring comment" });
  }
};
