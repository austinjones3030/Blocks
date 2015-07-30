




module.exports = function(request, response, next){

    var start = +new Date();
    var stream = process.stdout;
    //Stores the request source
    var url = request.url;
    //Stores the request method
    var method = request.method;


    //Response events an emitter when finished
    //Event handler function runs ascynchronously

    response.on('finish', function(){

        //Calculate the duration of the request
        var duration = +new Date() - start;
        var message = method + ' to ' + url +
                '\ntook ' + duration + ' ms \n\n';
        stream.write(message);

    });

next();

};