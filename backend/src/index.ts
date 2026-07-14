import express, { urlencoded } from "express"
import type { Request,Response } from "express"
import { clerkMiddleware } from '@clerk/express'
import cors from "cors"
import { ENV } from "./config/env.ts"


const app=express()
app.use(cors({origin:ENV.FRONTEND_URL}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(clerkMiddleware())


app.get("/",(req:Request,res:Response)=>{
        res.send({message:"heloo from the server"})
})

app.listen(ENV.PORT,()=>{
    console.log("Listening on port: ",ENV.PORT)
})