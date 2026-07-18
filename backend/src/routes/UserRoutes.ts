
import { Router } from "express";
import { asyncUser } from "../controllers/UserController.ts";
import { requireAuth } from "@clerk/express";

const route=Router()

route.get("/sync",requireAuth(),asyncUser)

export default route