const AWS = require('aws-sdk');
const links = require("./links.view.js");
const PhotoUploads = require("../db/photo-uploads.model");


const photoUploads = async params => {
    let uploadsHTML = ''
    const uploads = await PhotoUploads.getAll();
    if(uploads){
        uploads.Items.forEach(item => {
            console.log(item.DateUploaded);
            var bucketName = encodeURIComponent(item.Url.split('.s3.')[0].split('\/\/')[1]);
            var key = encodeURIComponent(item.Caption);
            var id = encodeURIComponent(item.Id);
            uploadsHTML += /*html*/ `
                <div>
                    <a target="_blank" href="${item.Url}">
                        <img style="width:400px;" alt="${item.Caption}" src="${item.Url}"/>
                    </a>
                    <div>
                        <em>${item.Caption}</em>
                        <button onclick="deleteImage('${bucketName}','${key}','${id}')">Delete</button>
                    </div>
                    <br>
                </div>
            `
        })
    }
    return  ( /*html*/ ` 
    <html>
        <head>
            <title>Photo Uploads - Welcome to Sample CRUD App!</title>
        </head>
        <body>
            <h1>Here's the S3 Photo Uploads View </h1>
            <p>Here, you can browse for photos that have been uploaded, and upload your own.</p>

            ${params.links ? 
                /*html*/
                `<h3>Here are all of the links:</h3>
                    <ul>
                        ${links(params.links)}
                    </ul>
                `
            : ""}
            <h3>Upload Photo</h3>
            <form onsubmit="return uploadImage(event)"  id="photo-uploader" enctype="multipart/form-data" action="/api/photo-uploads?redirect=true" method="POST">
                <input name="photo" onchange="document.getElementById('submit').removeAttribute('disabled')" type="file"/>
                <div>
                    <br>
                    <button id="submit"disabled type="submit">Submit Image</button>
                </div>
            </form>
            <h3>Photos</h3>
            <div id="photos">
                ${uploadsHTML}
            </div>
            <h3>Here are some extra params:</h3>
                <pre>${JSON.stringify({...params, links: true})}</pre>
            <h3>Process.env:</h3>
                <pre>${JSON.stringify(process.env.AWS_REGION)}</pre>
            <script>
                function deleteImage(bucket,key,id){
                    fetch("/api/photo-uploads?bucket="+bucket+"&id="+id+"&redirect=true", {
                        method: "DELETE"
                    }).then(function(){
                        window.location.reload();
                    })
                }
            </script>
        </body>
    </html>
`)}

module.exports = photoUploads;
