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


function orderResult(results,type){
    
    const perIdAsc = (c1,c2)=>{
        
        if(c1.id > c2.id) return 1
        else if(c1.id < c2.id) return -1
        else return 0
    }
    const perIdDesc = (c1,c2)=>{

        if(c1.id > c2.id) return -1
        else if(c1.id < c2.id) return 1
        else return 0
    }

    const perPriceAsc = (c1,c2)=>{
        if(c1.price > c2.price) return 1
        else if(c1.price < c2.price) return -1
        else return 0
    }

    const perPriceDesc = (c1,c2)=>{
        if(c1.price > c2.price) return -1
        else if(c1.price < c2.price) return 1
        else return 0
    }
    

    switch(type){
        case "perIdAsc":
            return results.sort(perIdAsc)
        case "perIdDesc":
            return results.sort(perIdDesc)
        case "perPriceAsc":
            return results.sort(perPriceAsc)
        case "perPriceDesc":
            return results.sort(perPriceDesc)
        default:
            return results
    }
}

module.exports ={
    getDetailCurrency,
    parseCurrencies,
    orderResult
}
