//CRUD API routes
const express = require('express');
const router = express.router();
const Fruits = require("../db/fruits.model");

// read
router.get('/api/fruit', async (req,res) => {
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
router.post('/api/fruit', async (req,res) => {
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
router.put("/api/fruit", async (req,res) => {
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
router.delete("/api/fruit", async (req,res) => {
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

module.exports = router;