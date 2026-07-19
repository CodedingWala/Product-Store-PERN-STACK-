import express  from "express"
import type { Request,Response } from "express"
import { clerkMiddleware, getAuth } from '@clerk/express'
import cors from "cors"
import { ENV } from "./config/env.ts"
import userRoute from "./routes/UserRoutes.ts"
import productRoute from "./routes/ProductRoute.ts"
import commentRoute from "./routes/CommentRoute.ts"


const app=express()
app.use(cors({origin:ENV.FRONTEND_URL,credentials:true}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(clerkMiddleware())


app.get("/",(req:Request,res:Response)=>{
    const {userId}=getAuth(req)
        res.send({message:"heloo from the server",userId})
        
})

app.use("/api/user",userRoute)
app.use("/api/prducts",productRoute)
app.use("/api/comments",commentRoute)


app.listen(ENV.PORT,()=>{
    console.log("Listening on port: ",ENV.PORT)
})