
/*
*All Blocks related logic is encapsulated inside this routes file
 */
var express = require('express');
//Returns router instance which can be mounted as a middleware
var router = express.Router();
var bodyParser = require('body-parser');
//Forces the use of the native querystring Node Library
var parseUrlencoded = bodyParser.urlencoded({ extended: false });


//Object
var blocks = {

    'Fixed': 'Fastened securely in position',
    'Movable': 'Capable of being moved',
    'Rotating': 'Moving in a circle around its center'

};

var locations = {

    'Fixed': 'First floor',
    'Movable': 'Second floor',
    'Rotating': 'Penthouse'

};

//The root path relative to the path where it's mounted
//Returns route objects which handles all requests (regardless of Http method) to the /blocks path
//**Chaining functions below!!
router.route('/')
    .get(function(request, response){

        response.json(Object.keys(blocks));

    })
    .post(parseUrlencoded, function(request, response){

        //Returns form data
        var newBlock = request.body;
        //Adds new block to the blocks object
        blocks[newBlock.name] = newBlock.description;

        //Respond with new block name, set 201 created status code
        response.status(201).json(newBlock.name);

    });
router.route('/:name')
    .all(function (request, response, next){

        //Get the request parameter (name)
        var name = request.params.name;
        //Assign name to a variable and perform upper/lower validation
        var block = name[0].toUpperCase() + name.slice(1).toLowerCase();

        //Block name can be accessed from other routes in the app
        request.blockName = block;

        //Must be called to resume request
        next();

    })
    //Gets the Blocks description based on the name
    .get(function(request, response){

        var description = blocks[request.blockName];

        //If no Description:
        if (!description){
            response.status(404).json('No description found for ' + request.params.name);

        } else {
            response.json(description);
        }
    })
    //Delete route, takes the block name as argument
    .delete(function(request, response){

        //removes entry from the blocks object
        delete blocks[request.blockName];
        response.sendStatus(200);
    });



//exports the router as a Node module
module.exports = router;


