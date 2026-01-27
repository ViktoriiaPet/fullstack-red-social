import { Router } from "express";
import {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  hardDeleteComment,
  softDeleteComment,
  restoreComment
} from "../controllers/comments.controller.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = Router();

router.get("/", getAllComments);
router.get("/:id", getCommentById);
router.post("/", authMiddleware, createComment);
router.put("/:id",authMiddleware, updateComment);
router.delete("/:id",authMiddleware, softDeleteComment);
router.post("/restore/:id", authMiddleware, restoreComment);
router.delete("/hardDelete/:id",authMiddleware, hardDeleteComment);


export default router;
