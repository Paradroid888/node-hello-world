/// <reference path="node_modules/typings/main.d.ts" />

var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var qs = require('querystring');

var server = http.createServer(function(request, response){
    var templateFile = 'templates/hello.html';
    
    if (request.method == "GET"){
        response.writeHead(200, {'Content-Type': 'text/html'} );
        
        fs.readFile(templateFile, "utf-8", function(err, templateFile){
            var output = templateFile.replace('<i id="outputmessage">', '<i id="outputmessage" style="display:none;">') 
            response.write(output);
            response.end();            
        });
        
    } else if (request.method == "POST"){
        var formPostBody = '';
        request.on('data', function(postData){
            formPostBody += postData.toString()
        })
        .on('end', function(){
            var formModel = qs.parse(formPostBody);
            var name = formModel.name;
            fs.readFile(templateFile, "utf-8", function(err, templateFile){
                var output = templateFile.replace("{model.Name}", name);
                response.write(output);
                response.end();            
            });
        })
    }
    return;
     
})

var portNumber = 3000;
server.listen(portNumber);

console.log("Server started on port " + portNumber);