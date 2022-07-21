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
s3 = new AWS.S3({apiVersion: '2006-03-01'});

// load other packages
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const views = require("./views-generator.js");

// load middleware
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
app.use(bodyParser.text({ type: 'text/html' }));
app.use(bodyParser.urlencoded());
app.use(express.json());

// load routes
app.use(require('./controllers/fruits.controller'));
app.use(require('./controllers/photo-uploads.controller'));

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

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});