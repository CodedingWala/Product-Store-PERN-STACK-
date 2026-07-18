import { getAuth } from "@clerk/express";
import * as querry from "../db/query.ts"
import type { Request, Response, NextFunction } from "express"
import { newComment } from "../db/schema.js";

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

        if (!existingProduct || existingProduct.userId != userId) {
            return res.status(404).json({ error: "Product not found" })
        }

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

        const existingProduct = await querry.getProductById(commentId.toString())

        if (!existingProduct || existingProduct.userId != userId) {
            return res.status(404).json({ error: "Product not found" })
        }

        await querry.deleteComment(commentId.toString());

        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        console.error("Error creating comment:", error);
        res.status(500).json({ error: "Failed to delete comment" });
    }
}