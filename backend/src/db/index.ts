import {drizzle} from "drizzle-orm/node-postgres"
import * as schema from "./schema.ts"
import { ENV } from "../config/env.ts"
import { Pool } from "pg"

if(!ENV.DB_URL){
    console.log("the database url is not provided")
}

const  pool=new Pool({connectionString:ENV.DB_URL})

pool.on("connect",()=>{
    console.log("database connected successfully")
})

pool.on("error",(err)=>{
    console.log("error occured during connection: ",err.message)
})

export const db=drizzle({client:pool,schema})