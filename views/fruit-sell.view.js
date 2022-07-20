const links = require("./links.view.js");

const fruit = params => 
{
    
    return  ( /*html*/ ` 
    <html>
        <head>
            <title>Welcome to Sample CRUD App!</title>
        </head>
        <body>
            <h1>Sell Some Fruits</h1>
            <p>List some fruit for sale here.</p>
            <form action="/api/fruit" method="POST" id="form">
                <div>
                    <label for="FruitName">Name of fruit (e.g. "Apple", "Banana"):</label><br>
                    <input required name="FruitName" id="FruitName" />
                </div>
                <div>
                    <label for="FruitColor">Color of fruit:</label><br>
                    <input required name="FruitColor" id="FruitColor" />
                </div>
                <div>
                    <label for="FruitCost">Price of fruit ($USD):</label><br>
                    <input required step="0.01" type="number" name="FruitCost" id="FruitCost" />
                </div>
                <div>
                    <label for="FruitQuantity">Quantity to Sell:</label><br>
                    <input required type="number" name="FruitQuantity" id="FruitQuantity" />
                </div>
                <div>
                    <label for="SellerEmail">Your Seller email:</label><br>
                    <input required type="email" name="SellerEmail" id="SellerEmail" />
                </div>
                <br>
                <button type="submit">List Fruit</button>
            </form>
            ${params.links ? 
                /*html*/
                `<h3>Here are all of the links:</h3>
                    <ul>
                        ${links(params.links)}
                    </ul>
                `
            : ""}
            <h3>Here are some extra params:</h3>
                <pre>${JSON.stringify({...params, links: true})}</pre>
        </body>
    </html>
`)}

module.exports = fruit;
