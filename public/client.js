



$(function() {

    $.get('/blocks', appendToList);


    //Handle the form Submission
    $('form').on('submit', function(event) {

        event.preventDefault();
        var form = $(this);
        //Transform data into URL-encoded notation
        var blockData = form.serialize();

        $.ajax({
            type: 'POST', url: '/blocks', data: blockData
        }).done(function (blockName) {
            //Array with the new block as its single argument
            appendToList([blockName]);

            //Cleans up form text input fields
            form.trigger('reset');

        });
    });


    //Event listener on all links with a data-block attribute
    $('.block-list').on('click', 'a[data-block]', function (event) {

        if (!confirm('Are you sure?')) {
            return false;
        }

        // the link element that was clicked
        var target = $(event.currentTarget);

        $.ajax({ // Reads the block name from the link's data-block attribute
            type: 'DELETE', url: '/blocks/' + target.data('block')
        }).done(function () {

            //removes li element containing the link
            target.parents('li').remove();

        });
    });







    function appendToList(blocks) {

        //Create empty array
        var list = [];

        var content, block;

        //Cycle through adding each element to the array
        for (var i in blocks) {

            block = blocks[i];

            //Link to each block's description
            content = '<a href="/blocks/'+block+'">'+block+'</a> '+

                '<a href="#" data-block="'+block+'"><img src="delete.png" style="width:20px;height:20px;"></a>';


            //Display the link
            list.push($('<li>', { html: content }));
        }

        //append list to array
        $('.block-list').append(list);



    }
});


