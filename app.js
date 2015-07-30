
var express = require('express');
//Local module not a NPM (node_modules) module
var logger = require('./logger');

var app = express();

app.use(logger);

//To serve static files from the public folder
app.use(express.static('public'));


//Use Modules for routing
var blocks = require('./routes/blocks');
//Router is mounted in a particular root URL
app.use('/blocks', blocks);



/*
app.get('/locations/:name', function(request, response){
    var location = locations[request.blockName];
    //If no Locations
    if (!location){
        response.status(404).json('No location found for ' + request.params.name);

    } else {
        response.json(description);
    }
});*/

var port = process.env.PORT || 8080;
app.listen(port);
console.log('Application Listening on port %s', port);


/*
app.listen(8080, function(){
    console.log('Listening on port 8080');
});
*/


