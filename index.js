const express = require("express")
const fs = require("fs/promises")
const {parseCurrencies} = require("./utils")


const app = express()

const coinsRouter = require("./routes/coins")




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


/* app.get("/api/coins",async (req,res)=>{
    let {page,currency} = req.query
    let coins = await cgClient.coins.all({page:page ? page : 1})
    let parsedCoins=parseCurrencies(coins.data,currency ? currency : "usd")
    res.json(parsedCoins)
})


app.get("/api/coins/:id",async (req,res)=>{
    let coin = await cgClient.coins.fetch(req.params.id)
    if(!coin.success){
        res.json({error:`Cryptocurrency ${req.params.id} not found`})
    }else{
        
        res.json(coin.data)
    }
}) */



app.get("*",(req,res)=>{
    res.sendStatus(404)
    
})





app.listen(8080,()=>{
    console.log("servidor corriendo")
})