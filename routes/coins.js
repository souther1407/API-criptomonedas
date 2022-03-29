const router = require("express").Router()
const cgClient = require("../coingeckoClient")
const {parseCurrencies,orderResult} = require("../utils")

router.get("/",async (req,res)=>{
    let {page,currency,order} = req.query
    let coins = await cgClient.coins.all({page:page ? page : 1})
    let parsedCoins=parseCurrencies(coins.data,currency ? currency : "usd")

    res.json(order ? orderResult(parsedCoins,order) : parsedCoins)
})

router.get("/:id",async (req,res)=>{
    let coin = await cgClient.coins.fetch(req.params.id)
    if(!coin.success){
        res.json({error:`Cryptocurrency ${req.params.id} not found`})
    }else{
        
        res.json(coin.data)
    }
})



module.exports = router