const http = require('http');
const url = require('url');
const {StringDecoder}= require('string_decoder');

const app={};

app.config ={
    port : 5000,
};

app.createServer=()=> {
    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.port,()=>{
        console.log(`listening to port ${app.config.port}`);
    });
};

 app.handleReqRes =(req,res)=>{
     
    const parsedUrl =url.parse(req.url,true);
    const path = parsedUrl.pathname;
    const trimmedpath= path.replace(/^\/+|\/+$/g,'');
    const mathod = req.method.toLowerCase();
    const queryStringObject= parsedUrl.query;
    const headersObject = req.headers;

    const decoder = new StringDecoder('utf-8');
    let realData = '';
    
    req.on('data',(buffer) =>{
        realData  += decoder.write(buffer);
    })
   req.on('end',()=>{
    realData += decoder.end();
    console.log(realData);
    res.end("rumaisa the boss");
   })

 }

 app.createServer();