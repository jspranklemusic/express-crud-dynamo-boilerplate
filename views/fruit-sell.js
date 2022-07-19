const links = require("./links.js");

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
            <form id="form">
                <div>
                    <label for="fruit-name">Name of fruit (e.g. "Apple", "Banana"):</label><br>
                    <input required name="fruit-name" id="fruit-name" />
                </div>
                <div>
                    <label for="fruit-color">Color of fruit:</label><br>
                    <input required name="fruit-color" id="fruit-color" />
                </div>
                <div>
                    <label for="fruit-price">Price of fruit ($USD):</label><br>
                    <input required type="number" name="fruit-price" id="fruit-price" />
                </div>
                <div>
                    <label for="fruit-quantity">Quantity to Sell:</label><br>
                    <input required type="number" name="fruit-quantity" id="fruit-quantity" />
                </div>
                <div>
                    <label for="fruit-seller-email">Your Seller email:</label><br>
                    <input required type="email" name="fruit-seller-email" id="fruit-seller-email" />
                </div>
                <br>
                <button>List Fruit</button>
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
