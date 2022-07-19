const links = require("./links.js");
const Fruits = require("../db/fruits");

const fruit = async params => 
{
    if(params.id) {
        const response = await Fruits.getById(params.id);
        const fruit = response.Item;
        if(fruit){
            fruit.Quantity -= 1;
            if(fruit.Quantity == 0){
                await Fruits.deleteById(params.id)
            }else{
                await Fruits.update(fruit);
            }
        }
    }

    const fruits = await Fruits.getAll();
    let fruitsHTML = "";
    fruits.Items.forEach((item,i) => {
        fruitsHTML += /*html*/ `
            <li>
                <strong>${item.FruitName}</strong>
                <ul>
                    <li>Quantity: ${item.Quantity}</li>
                    <li>Seller: ${item.SellerEmail}</li>
                    <li>Price: $${item.FruitCost/100}</li>
                    <a href="/fruit/buy?id=${item.Id}">Buy</a>
                </ul>
            </li>
        `
    })
    return  ( /*html*/ ` 
    <html>
        <head>
            <title>Welcome to Sample CRUD App!</title>
        </head>
        <body>
            <h1>Buy some delicious fruits</h1>
            <p>Mhmmm. We have all kinds of fruits - apples, bananas, you name it!</p>
            ${params.links ? 
                /*html*/
                `<h3>Here are all of the links:</h3>
                    <ul>
                        ${links(params.links)}
                    </ul>
                `
            : ""}
            <h3>Here are all of the fruits:</h3>
            <ul id="fruits">
                ${fruitsHTML}
            </ul>
            <h3>Here are some extra params:</h3>
                <pre>${JSON.stringify({...params, links: true})}</pre>
            <script>
                async function fetchFruits(){
                    const response = await fetch("/api/fruits");
                    const data = await response.json();
                    document.getElementById("fruits").innerHTML = "<pre>" + JSON.stringify(data) + "</pre>"
                }
                //fetchFruits();
            </script>
        </body>
        
    </html>
`)}



module.exports = fruit;
