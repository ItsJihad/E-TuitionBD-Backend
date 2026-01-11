import dotenv from 'dotenv'
dotenv.config({
    path:'./.env'
})

import { connectDB } from "./DB/ConnectDB.js";


connectDB()