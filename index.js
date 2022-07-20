// ABOUT: this is a boilerplate SSR app to demonstrate connection to S3 and DynamoDB

// Load AWS Config
const AWS = require('aws-sdk');
const awsConfigObject = {
    region: process.env.AWS_REGION,
    profile: process.env.AWS_PROFILE
}
if(process.env.MODE == "development") {
    awsConfigObject.endpoint = process.env.AWS_ENDPOINT;
    console.log(awsConfigObject)
}
AWS.config.update( awsConfigObject );

// load other packages
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// load middleware
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
app.use(bodyParser.text({ type: 'text/html' }));
app.use(bodyParser.urlencoded());
app.use(express.json());

// load local packages
const Fruits = require('./db/fruits.model.js')
const views = require("./views.js");

// port on which the server listens
const PORT = process.env.PORT || 8000;

function generateViews(){
    viewKeys = Object.keys(views);
    viewKeys.forEach(key => {
        app.get(key, async(req,res)=>{
            const html = await views[key].html({
                hello: "world",
                links: views,
                ...req.query,
                ...req.body
            })
            res.send(html);
        })
    })
}


generateViews();

//CRUD API routes

// read
app.get('/api/fruit', async (req,res) => {
    try {
        if(req.query.id) {
            const response = await Fruits.getById(req.query.id);
            const fruit = response.Item;
            if(fruit)
                return res.json(fruit);
        }else{
            const response = await Fruits.getAll();
            return res.json(response.Items)
        }
    return res.json({results: "no fruits yet!"})
    }catch(error){
        res.status(400).send(err)
    }
})

// create
app.post('/api/fruit', async (req,res) => {
    try{
        console.log(req.headers)
        const { FruitName, FruitColor, FruitCost, FruitQuantity, SellerEmail } = req.body;
        const result = await Fruits.save({ 
            FruitName, 
            FruitColor, 
            FruitCost: parseFloat(FruitCost)*100, 
            FruitQuantity: parseInt(FruitQuantity), 
            SellerEmail 
        });
        // if request is coming from SSR view
        if(req.headers['content-type'] == 'application/x-www-form-urlencoded'){
            return res.redirect("/fruit/buy");
        }
        return res.send(result)
    }catch(err){
        res.status(400).send(err)
    }
})

// update
app.put("/api/fruit", async (req,res) => {
    try{
        console.log("req.body",req.body)
        const { FruitName, FruitColor, FruitCost, FruitQuantity, SellerEmail, Id } = req.body;
        const result = await Fruits.update({ 
            FruitName, 
            FruitColor, 
            FruitCost: parseInt(FruitCost), 
            FruitQuantity: parseInt(FruitQuantity), 
            SellerEmail,
            Id
        });
    
        return res.json(result)

    } catch(err){
        return res.status(400).send(err);
    }
})

// delete
app.delete("/api/fruit", async (req,res) => {
    try {
        if(!req.query.id){
            return res.status(400).send("Delete request must have an id")
        }
        // if request is coming from SSR view
        const result = await Fruits.deleteById(req.query.id);
        return res.send(result)
    } catch(err) {
        res.status(400).send(err);
    }
})



app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});