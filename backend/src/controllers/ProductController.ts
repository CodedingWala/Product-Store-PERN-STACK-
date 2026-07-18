import type { Request, Response, NextFunction } from "express"
import * as querry from "../db/query.ts"
import { getAuth } from "@clerk/express"
import { newProduct } from "../db/schema.js"


export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const AllProducts = await querry.getAllProducts()
        res.status(200).json(AllProducts)
    } catch (error) {
        console.log("error occured in geAllProducts", error)
        res.status(500).json({ message: "internal server error" })
    }
}

export const getMyProducts = async (req: Request, res: Response) => {
    try {
        const { userId } = getAuth(req)

        if (!userId) return res.status(401).json({ error: "Unauthorized" });

        const products = await querry.getProductByuserId(userId)
        res.status(200).json(products);

    } catch (error) {
        console.log("error occured in geAllProducts", error)
        res.status(500).json({ message: "internal server error" })
    }
}


export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        if (!id) return res.status(401).json({ error: "Unauthorized" });

        const product = await querry.getProductById(id.toString())
        res.status(200).json(product);



    } catch (error) {
        console.log("error occured in geMyproducts", error)
        res.status(500).json({ message: "internal server error" })
    }
}

export const createProduct = async (req: Request, res: Response) => {
    try {
        const { userId } = getAuth(req)
        if (!userId) return res.status(401).json({ error: "Unauthorized" });

        const { title, description, image } = req.body
        if (!title || !description || !image) {
            return res.status(404).json({ error: "title , description and image should be present" });
        }

        const product = await querry.createProduct({ userId, title, description, image })
        res.status(200).json(product);
    } catch (error) {
        console.log("error occured in createProduct", error)
        res.status(500).json({ message: "internal server error" })
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { userId } = getAuth(req)
        const { id } = req.params
        const { title, description, image } = req.body

        if (!userId || !id) return res.status(401).json({ error: "Unauthorized" });

        const existingProduct = await querry.getProductById(id.toString())
        if (!existingProduct || existingProduct.userId != userId) {
            res.status(404).json({ message: "product does not exist user has no right to update this product" })
        }

        if (!title || !description || !image) {
            return res.status(404).json({ error: "title , description and image should be present" });
        }

        const product = await querry.updateProduct(id.toString(), {
            title,
            description,
            image
        })
        res.status(200).json(product);


    } catch (error) {
        console.log("error occured in upDateProduct", error)
        res.status(500).json({ message: "internal server error" })
    }
}

export const deleteProduct=async(req:Request,res:Response)=>{
    try {
        const {userId}=getAuth(req)
        const {id}=req.params

        if (!userId || !id) return res.status(401).json({ error: "Unauthorized" });

        const existingProduct=await querry.getProductById(id.toString())

        if(!existingProduct || existingProduct.userId!=userId){
             res.status(404).json({ message: "product does not exist user has no right to update this product" })
        }

        const product =await querry.deleteProductById(id.toString())
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.log("error occured in deleteProduct", error)
        res.status(500).json({ message: "internal server error" })
    }
}