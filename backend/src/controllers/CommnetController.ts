import { getAuth } from "@clerk/express";
import * as querry from "../db/query.js"
import type { Request, Response, NextFunction } from "express"
import type{ newComment } from "../db/schema.js";

export const createComment = async (req: Request, res: Response) => {
    try {
        const { userId } = getAuth(req)
        const { productId } = req.params
        const { content } = req.body

        if (!userId) return res.status(401).json({ error: "UnAuthorized user" })
        if (!productId || !content) {
            return res.status(400).json({ error: "ProductId and content is required" })
        }
        const existingProduct = await querry.getProductById(productId.toString())

        if (!existingProduct) {
            return res.status(404).json({ error: "Product not found" })
        }
        console.log("content: ",content," productId: ",productId," userId: ",userId)
        const comment = await querry.createComment({
            content,
            userId,
            productId,
        } as newComment);

        return res.status(200).json(comment)
    } catch (error) {
        console.error("Error creating comment:", error);
        res.status(500).json({ error: "Failed to create comment" });
    }
}


export const DeleteComment = async (req: Request, res: Response) => {
    try {
        const { userId } = getAuth(req)
        const { commentId } = req.params

        if (!userId) return res.status(401).json({ error: "UnAuthorized user" })

        const existingComment = await querry.getCommentById(commentId.toString());
        
        if (!existingComment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        // ✅ Check if the user owns the comment
        if (existingComment.userId !== userId) {
            return res.status(403).json({ 
                error: "You can only delete your own comments" 
            });
        }

        await querry.deleteComment(commentId.toString());

        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        console.error("Error creating comment:", error);
        res.status(500).json({ error: "Failed to delete comment" });
    }
}
