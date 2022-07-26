const DynamoModeler = require("../lib/DynamoModeler");

const PhotoUploads = new DynamoModeler({
    schema: {
        Url: String,
        DateUploaded: Number,
        Id: String,
        Caption: String
    },
    tableName: "PhotoUploads",
    hash: "Id",
    range: "DateUploaded"
});

module.exports = PhotoUploads;