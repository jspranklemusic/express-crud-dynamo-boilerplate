// this module dynamically loads models from their postition in the /db folder
const fs = require("fs");
const models = {}
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

const dynamoDb = new AWS.DynamoDB();


const importSchemaFromFiles = () => {
    const directoryFiles = fs.readdirSync("./db");

    directoryFiles.forEach(file => {
        if(file != "migrate.js"){
            const file_path = __dirname + "/" + file
            const modelName = file.split(".");
            if(modelName[2] == "js"){
                models[modelName[0][0].toUpperCase() + file.substring(1)] = require(file_path);
            }
        }
    })
    // console.log(directoryFiles.length - 1 + " files found:", models)
}

importSchemaFromFiles();

const generateTableFromSchema = model => {
    const SchemaMapper = {
        "string" : "S",
        "number" : "N",
        "object" : "M",
        "array" : "L",
        "boolean" : "B"
    }
    const config = {
        AttributeDefinitions: [],
        KeySchema: [],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          },
          TableName: model.tableName,
          StreamSpecification: {
            StreamEnabled: false
          }
    }
    const keys = Object.keys(model.schema);
    keys.forEach(key => {
        let property = model.schema[key]();
        if(key == model.hash || key == model.range){
            config.AttributeDefinitions.push({
                AttributeName: key,
                AttributeType: SchemaMapper[typeof property]
            })
        }
    })
    config.KeySchema.push({
        AttributeName: model.hash,
        KeyType: 'HASH'
    });
    if(model.range){
        config.KeySchema.push({
            AttributeName: model.range,
            KeyType: 'RANGE'
        })
    }
   
    return config
}

async function createTable(model){
    try {
        const response = await dynamoDb.describeTable({TableName: model.tableName}).promise();
        console.log(`${response.Table.TableName} - table exists`);
    } catch {
        console.log("making table from model: ", model.tableName)
        const params = generateTableFromSchema(model);
        dynamoDb.createTable(params, function(err, data) {
            if (err) {
            console.log("Could not create table - ",err);
            } else {
            console.log(data, `"${model.tableName}" Table created.`);
            }
        });
    }

}

for(let model in models){
    createTable(models[model]);
}

