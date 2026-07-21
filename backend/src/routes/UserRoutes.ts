
import { Router } from "express";
import { asyncUser } from "../controllers/UserController.js";
import { requireAuth } from "@clerk/express";

const route=Router()

route.post("/sync",requireAuth(),asyncUser)

export default route