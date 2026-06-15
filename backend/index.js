import express from "express"
import dotenv from 'dotenv'
dotenv.config()

const port = 8000
const app = express()

app.get("/",(req,res))=>{
    res.send("hello from server")

}

app.listen(port, () =>{
    console.log("server started")
})