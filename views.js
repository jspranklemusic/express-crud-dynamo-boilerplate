const views = {
    "/": {
        html: require("./views/index.view.js"),
        name: "Home"
    },
    "/fruit/buy": {
        html: require("./views/fruit.view.js"),
        name: "Buy Fruit"
    },
    "/fruit/sell": {
        html: require("./views/fruit-sell.view.js"),
        name: "Sell Fruit"
    },
    "/photo-uploads": {
        html: require("./views/photo-uploads.view.js"),
        name: "Photo Uploads"
    }
}

module.exports = views;