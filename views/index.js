const links = require("./links.js");
const index = params => 
{
    
    return  ( /*html*/ ` 
    <html>
        <head>
            <title>Welcome to Sample CRUD App!</title>
        </head>
        <body>
            <h1>Welcome to Sample CRUD App!</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
            ${params.links ? 
                /*html*/
                `<h3>Here are all of the links:</h3>
                    <ul>
                        ${links(params.links)}
                    </ul>
                `
            : ""}
            <h3>Here are some extra params:</h3>
                <pre>${JSON.stringify({...params, links: true})}</pre>
            <h3>Process.env:</h3>
                <pre>${JSON.stringify(process.env.AWS_REGION)}</pre>
            
        </body>
    </html>
`)}

module.exports = index;
