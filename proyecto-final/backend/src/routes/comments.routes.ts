import { Router } from "express";
import {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  hardDeleteComment,
  softDeleteComment
} from "../controllers/comments.controller.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = Router();

router.get("/", getAllComments);
router.get("/:id", getCommentById);
router.post("/", authMiddleware, createComment);
router.put("/:id", updateComment);
router.delete("/:id", softDeleteComment);
router.delete("/hardDelete/:id", hardDeleteComment);


export default router;
