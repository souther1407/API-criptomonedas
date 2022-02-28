const express = require("express")

const coingecko = require("coingecko-api")

const cgClient = new coingecko()

const app = express()



function parseCurrencies(data,currency){
    const parsedCurrencies=[]
    for(let crypto of data){
        parsedCurrencies.push({
            id:crypto.id,
            name:crypto.name,
            price:crypto.market_data.current_price[currency]
        })
    }
    return parsedCurrencies
}

function getDetailCurrency({name,symbol,description,image,market_cap_rank,market_data}){
    return {
        name,
        symbol,
        description:description.en,
        image,
        market_cap_rank,
        prices:market_data.current_price

    }
}

//Aqui deberia ir el front
app.get("/", async (req,res)=>{
    let status = await cgClient.ping()
    res.json(status)
})

//ddasd
app.get("/api/coins",async (req,res)=>{
    let coins = await cgClient.coins.all()
    let parsedCoins=parseCurrencies(coins.data,"usd")
    res.json(parsedCoins)
})


app.get("/api/coins/:id",async (req,res)=>{
    let coin = await cgClient.coins.fetch(req.params.id)
    if(!coin.success){
        res.json({error:`Cryptocurrency ${req.params.id} not found`})
    }else{
        console.log(coin)
        res.json(getDetailCurrency(coin.data))
    }
})







app.listen(8080)