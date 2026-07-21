import { Router } from "express";
import { requireAuth } from "@clerk/express";
import { createProduct, deleteProduct, getAllProducts, getMyProducts, getProductById, updateProduct } from "../controllers/ProductController.js";

const route=Router()
route.get("/",getAllProducts)
route.get("/my",requireAuth(),getMyProducts)
route.get("/:id",getProductById)


route.post("/",requireAuth(),createProduct)
route.put("/:id",requireAuth(),updateProduct)
route.delete("/:id",requireAuth(),deleteProduct)

export default route