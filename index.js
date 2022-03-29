const express = require("express")
const fs = require("fs/promises")
const {parseCurrencies} = require("./utils")
const morgan = require("morgan")

const app = express()

const coinsRouter = require("./routes/coins")

app.use(express.json())
app.use(express.urlencoded())
app.use(morgan("dev"))

//Aqui deberia ir el front
app.get("/", async (req,res)=>{
    /* let status = await cgClient.ping()
    res.json(status) */
    let html = await fs.readFile("./index.html","utf-8")
    let css = await fs.readFile("./styles.css","utf-8")
    html=html.replace("/**/",css)
    res.send(html)

})


app.use("/api/coins",coinsRouter,)






app.get("*",(req,res)=>{
    res.sendStatus(404)
    
})





app.listen(8080,()=>{
    console.log("servidor corriendo")
})