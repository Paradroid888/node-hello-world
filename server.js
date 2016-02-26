/// <reference path="node_modules/typings/main.d.ts" />

var http = require('http');
var url = require('url');

var server = http.createServer(function(request, response){
    
    var queryString = url.parse(request.url, true);
    
    response.writeHead(200, {"Content-Type": "text/plain"});
    
    if (queryString.query["name"]){
        response.write("Hello " + queryString.query["name"] +  " :)\n");    
    }
    else {
        response.write("Hello World\n");
    }
    response.end();
    
})

var portNumber = 3000;
server.listen(portNumber);

console.log("Server started on port " + portNumber);