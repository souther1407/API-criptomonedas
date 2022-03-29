const express = require("express")
const fs = require("fs/promises")
const {parseCurrencies} = require("./utils")
const morgan = require("morgan")

const app = express()

const coinsRouter = require("./routes/coins")

app.use(express.json())
app.use(express.urlencoded())
app.use(morgan("dev"))




app.use("/api/coins",coinsRouter,)






app.get("*",(req,res)=>{
    res.sendStatus(404)
    
})





app.listen(8080,()=>{
    console.log("servidor corriendo")
})