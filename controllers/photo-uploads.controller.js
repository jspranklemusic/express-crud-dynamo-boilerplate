// S3 API ROUTES
const express = require('express');
const multer = require('multer');
const router = express.Router();
const PhotoUploads = require("../db/photo-uploads.model");

// get all uploads
router.get("/api/photo-uploads", async (req,res)=>{
    const result = await PhotoUploads.getAll();
    return res.json(result);
})

// upload new photo - for production, image type and size validation will be needed
router.post("/api/photo-uploads", multer().single('photo'), async (req,res)=>{
    const uploadParams = {
        Bucket: process.env.S3_UPLOAD_BUCKET, 
        Key: req.file.originalname, 
        Body: req.file.buffer
    };
    const result = await s3.upload (uploadParams).promise();
    const upload = await PhotoUploads.save({
        Url: result.Location,
        DateUploaded: Date.now(),
        Caption: result.Key
    });
    if(req.query.redirect){
        return res.redirect("/photo-uploads");
    }
    return res.send({result, upload});
})  

// delete - for production, authentication will be needed
router.delete("/api/photo-uploads", async (req, res)=>{
    try{
        // if only id is passed, look up the object
        let deleteParams = {};
        if(!req.query.bucket | !req.query.key){
            const result = await PhotoUploads.getById(req.query.id);
            deleteParams = {
                Bucket: result.Item.Url.split('.s3.')[0].split('\/\/')[1],
                Key: result.Item.Caption
            }
        }else{
            deleteParams = {
                Bucket: req.query.bucket,
                Key: req.query.key
            }
        }
        const objectDeleteResult = await s3.deleteObject(deleteParams).promise();
        const metadataResult = await PhotoUploads.deleteById(req.query.id);
        if(req.query.redirect){
            return res.redirect("/photo-uploads");
        }
        return res.send({metadataResult, objectDeleteResult})
    } catch(error) {
        res.status(400).send(error);
    }
})

module.exports = router;