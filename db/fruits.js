
const crypto = require('crypto');
const AWS = require('aws-sdk');
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

// note: fruit cost is in USD pennies - so a cost of 100 would be $1.00
const Fruits = {
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

    build(){
        const templateObject = {...this.schema};
        for(let key in templateObject){
            templateObject[key] = templateObject[key]();
        }
        return templateObject;
    },

    validate(data){
    //    all schema attributes are required by default
        const thisKeys = Object.keys(this.schema);
        try{
            // check to make sure there are no invalid keys being passed
            Object.keys(data).forEach(key=>{
                console.log(key)
                let newDataType = typeof data[key];
                let schemaDataType = this.schema[key]();
                if(!key in this.schema) 
                    throw new Error(`"${key}" is not a valid key.`);
                // formdata sends numbers as strings, so both must be valid checked
                else if(typeof schemaDataType != newDataType){
                    throw new Error(`${key} has invalid data type of "${newDataType}". Type "${typeof schemaDataType}" is required.`);
                }
            })
            // check to make sure all of the keys are present
            thisKeys.forEach(key => {
                if(key != "Id" && !data[key]){
                    throw new Error(`${key} is a required attribute - received value "${data[key]}"`)
                }
            })
            console.log("Data successfully validated!")
            return true;
        }catch(error){
            console.error(error);
        }
    },
    async save(data) {
        if(!this.validate(data)) return false;
        const params = {
            TableName: this.tableName,
            Item: {...data, Id: crypto.randomBytes(20).toString('hex')}
        };
        const result = await dynamoDbClient.put(params).promise();
        return { result, params};
    },
    async getAll(){
        const result = await dynamoDbClient.scan({TableName: this.tableName}).promise();
        return result;
    },

    async getById(id){
        const result = await dynamoDbClient.get({
            TableName:  this.tableName,
            Key: {
              Id: id
            }
        }).promise()
        return result
    },

    async deleteById(id){
        const result = await dynamoDbClient.delete({
            TableName:  this.tableName,
            Key: {
              Id: id
            }
        }).promise()
        return result;
    },

    async update(data){
        if(!this.validate(data)) return false;
        const params = {
            TableName: this.tableName,
            Key: {
                Id: data.Id
            },
            ...this.generateUpdateQuery(data)
        };

        const result = await dynamoDbClient.update(params).promise();
        return { result, params };
  

    },

    generateUpdateQuery(fields){
        let exp = {
            UpdateExpression: 'set',
            ExpressionAttributeNames: {},
            ExpressionAttributeValues: {}
        }
        Object.entries(fields).forEach(([key, item]) => {
            if(key != this.hash){
                exp.UpdateExpression += ` #${key} = :${key},`;
                exp.ExpressionAttributeNames[`#${key}`] = key;
                exp.ExpressionAttributeValues[`:${key}`] = item
            }
        })
        exp.UpdateExpression = exp.UpdateExpression.slice(0, -1);
        return exp
    }
    
}







module.exports = Fruits;
