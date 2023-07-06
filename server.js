const http = require('http');
const fs = require('fs');
const _ = require('lodash'); // _ is generally used can be replaced 


const server = http.createServer(function(req, res) {
    console.log("request made");

    // res.setHeader('Content-Type', 'text/plain'); //text/html to add html
    // res.write('hello siddharth');
    // res.end();
    res.setHeader('Content-Type', 'text/html');

    //reading and sending an html file to browser using file system

    // fs.readFile('./views/landing.html' ,function(err , data){
    //     if(err){
    //         console.log(err);
    //         res.end(); // so that browser dont keep buffering
    //     }
    //     else{
    //         res.write(data);
    //         res.end(); //shortcut use res.end(data) instead
    //     }
    // });

    let path = './views/'; //let keyword doesnt let var_name to be redefined
    switch(req.url){
        case '/' :
            path += 'landing.html';
            res.statusCode = 200;
            break;
        case '/about' :
            path+= 'about.html';
            res.statusCode = 200;//everrythings ok
            break;
        case '/about-me' :
            res.statusCode = 301;   
            res.setHeader('Location', '/about'); //redirection url request
            res.end();
             
        default : 
            path+= '404err.html';
            res.statusCode = 404; //error loading page
            break;        
    }

    fs.readFile(path ,function(err , data){
            if(err){
                console.log(err);
                res.end(); // so that browser dont keep buffering
            }
            else{
                res.write(data);
                res.end(); //shortcut use res.end(data) instead
            }
        });

});

server.listen(3000 , 'localhost',function() {
    console.log("listening on");
});

//loadash provides a number of methods in its own module
//example generating a random number 

const num = _.random(1,100); //underscore can be replaces by any word in defn
console.log(num);
//to install dependancies use npm install