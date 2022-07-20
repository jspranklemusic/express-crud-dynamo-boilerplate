const links = require("./links.js");
const Fruits = require("../db/fruits");

const fruit = async params => {

    const fruits = await Fruits.getAll();
    console.log(fruits)
    let fruitsHTML = "";
    fruits.Items.forEach((item,i) => {
        fruitsHTML += /*html*/ `
            <li>
                <strong>${item.FruitName}</strong>
                <ul>
                    <li>Quantity: ${item.FruitQuantity}</li>
                    <li>Seller: ${item.SellerEmail}</li>
                    <li>Price: $${item.FruitCost/100}</li>
                    <a onclick='buyFruit(${JSON.stringify(item)})' href="#">Buy</a>
                    <a onclick='deleteFruit(${JSON.stringify(item)})' href="#">Delete</a>
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
                // PUT
                function buyFruit(fruit){
                    
                    fruit.FruitQuantity -= 1;
        
                    fetch('/api/fruit', {
                        method: "PUT",
                        headers: {
                            "Content-Type" : "application/json",
                            "Accept" : "application/json"
                        },
                        body: JSON.stringify({...fruit })
                    }).then(function(){
                        window.location.reload()
                    })
                }

                // DELETE
                function deleteFruit(fruit){
                    fetch('/api/fruit?id='+fruit.Id,{
                        method: 'DELETE'
                    }).then(function(){
                        window.location.reload()
                    })
                }
    
            </script>
        </body>
        
    </html>
`)}



module.exports = fruit;
