import { getAuth } from "@clerk/express";
import type { Request, Response } from "express";
import * as querries from "../db/query.ts"

export const asyncUser=async (req:Request,res:Response)=>{
    try {
        const {userId}=getAuth(req)
        if(!userId){
            return res.status(401).json({error:"UnAuthorized"})
        }
        const {email,name,imageUrl}=req.body
        if(!email || !name || !imageUrl){
            return res.status(404).json({message:"Email,Nmae and imageUrl are required"})
        }

        const user= await querries.upsertUser({
            id:userId,
            email,
            name,
            imageUrl
        })


        res.status(201).json(user)

    } catch (error) {
        console.log("error is here: ",error)
        res.status(501).json({error:`internal server error: ${error}`})
    }
}