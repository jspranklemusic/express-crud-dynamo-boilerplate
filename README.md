<h1>Express Crud DynamoDB Boilerplate App</h1>
<p>
    This a sample server-side rendered backend application designed to be used as a starter or template for future apps. If needed, the generated HTML views can be replaced with an SPA frontend. 
    Out of the box, it has a connection to DynamoDB and S3, and it includes a basic schema validation mapper 
    for DynamoDB. In order to use, make an .env file in the directory and provide your own credentials and profile. 
</p>
<h2>Installation and Setup</h2>
<h3></h3>
<p>
    To download, clone this repo with <em>git clone https://github.com/jspranklemusic/express-crud-dynamo-boilerplate.git</em> and run <pre>npm install</pre>
    
</p>
<h3>Setting up AWS</h3>
<p>
    In order to run using the <em>npm run dev</em> command, Java must first be installed to run the DynamoDB instance for local testing. Instructions for download and setup can be found here:
    <a href="https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html">
        https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html
    </a>
    In order to use S3, you must point to a bucket that gives proper permissions. I would recommend creating a bucket specifically for testing, and another one for production. 
</p>
<h3>Running</h3>

    There are two main methods of running this app.
    npm run dev
    This runs a shell script that will initialize a local DynamoDB instance for development, set the environment variables found in your <em>local.env</em> file, and start an express server with nodemon, which will automatically reload whenever a change in a javascript file is detected. If running for the first time, start the server first and then run sh migrate-dev to initialize the database tables. This command must be running after the server is started to connect to the local DynamoDB instance.
     npm start
    This runs a shell script that will set the environment variables found in your <em>local.env</em> file, and start an express server with node. This will not automatically reload, and it will point to the DynamoDB database available in your Amazon account instead of running the database locally. If running for the first time, run sh migrate-prod<to initialize the database tables.

