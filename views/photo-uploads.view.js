const AWS = require('aws-sdk');
const links = require("./links.view.js");
const PhotoUploads = require("../db/photo-uploads.model");


const photoUploads = async params => {
    const uploads = await PhotoUploads.getAll();
    let uploadsHTML = ''
    uploads.Items.forEach(item => {
        console.log(item.DateUploaded)
        uploadsHTML += /*html*/ `
            <div>
                <a target="_blank" href="${item.Url}">
                    <img style="width:400px;" alt="${item.Caption}" src="${item.Url}"/>
                </a>
                <div>
                    <em>${item.Caption} </em>
                </div>
            </div>
        `
    })
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
            <form  id="photo-uploader" enctype="multipart/form-data" action="/api/photo-uploads" method="POST">
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

            </script>
        </body>
    </html>
`)}

module.exports = photoUploads;
