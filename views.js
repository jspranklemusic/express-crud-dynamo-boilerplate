const views = {
    "/": {
        html: require("./views/index.js"),
        name: "Home"
    },
    "/fruit/buy": {
        html: require("./views/fruit.js"),
        name: "Buy Fruit"
    },
    "/fruit/sell": {
        html: require("./views/fruit-sell.js"),
        name: "Sell Fruit"
    }
}

module.exports = views;