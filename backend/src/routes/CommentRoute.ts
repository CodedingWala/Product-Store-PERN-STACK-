import { requireAuth } from "@clerk/express";
import { Router } from "express";
import { createComment, DeleteComment } from "../controllers/CommnetController.ts";

const route=Router()

route.post("/:productId", requireAuth(), createComment);

// DELETE /api/comments/:commentId - Delete comment (protected - owner only)
route.delete("/:commentId", requireAuth(), DeleteComment);

export default route