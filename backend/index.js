import express from 'express'
import dotenv from "dotenv"
import {dbConnect} from './database/dbConnect.js'
import authRouter from './routes/auth.routes.js'
import cookieParser from 'cookie-parser'
import cors from "cors"
import userRouter from './routes/user.routes.js'
import messageRouter from './routes/message.routes.js'
import { app,server } from './socket/socket.js'

dotenv.config()




app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(cookieParser())

app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)
app.use('/api/message',messageRouter)










server.listen(process.env.PORT,()=>{
    dbConnect()
console.log(`server is running on ${process.env.PORT}`)
})
