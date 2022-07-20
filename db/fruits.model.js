const DynamoModeler = require("../lib/DynamoModeler");

// note: fruit cost is in USD pennies - so a cost of 100 would be $1.00
const Fruits = new DynamoModeler({
    schema: {
        Id: String,
        FruitName: String,
        FruitColor: String,
        FruitCost: Number,
        FruitQuantity: Number,
        SellerEmail: String,
    },
    tableName: "Fruits",
    hash: "Id",
});

module.exports = Fruits;
