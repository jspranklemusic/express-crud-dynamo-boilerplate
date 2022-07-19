// ABOUT: this is a boilerplate SSR app to demonstrate connection to S3 and DynamoDB

// aws must be required first
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
const Fruits = require('./db/fruits')
const express = require('express');
const app = express();
const views = require("./views.js");
const bodyParser = require('body-parser');

app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
app.use(bodyParser.text({ type: 'text/html' }))

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

// controllers
app.get('/api/fruit', async (req,res) => {
    return res.json({results: "no fruits yet!"})
})

app.post('/api/fruit', async (req,res) => {
    
    try{
        const { FruitName, FruitColor, FruitCost, Quantity, SellerEmail } = req.body;
        const result = await Fruits.save({ 
            FruitName, 
            FruitColor, 
            FruitCost, 
            Quantity, 
            SellerEmail 
        });
        res.send(result)
    }catch(err){
        res.status(400).send(err)
    }
})

app.post('/api/fruit/sample', async (req, res)=>{
    try {
        const result = await Fruits.save({
            FruitName: String("apple"),
            FruitColor: String("red"),
            FruitCost: Number(150),
            Quantity: Number(10),
            SellerEmail: String("email_name2@mail.com"),
        })
        return res.json(result.params);
    } catch(error) {
        res.status(400).send(error)
    }
})

app.get("/rows/all", (req, res) => {
    // magic happens here
});

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});