let topics = ["Hidamari Sketch", "Kill la Kill", "Code Geass", "Neon Genesis Evangelion", "Bakemonogatari", "Joshiraku", "Idolm@ster", "My Hero Academia", "Yuru Camp", "Baccano", "Lucky Star"];
console.log(topics);
const APIKEY = "ucmeVf47TCsuxgRoTwmO2GV5ZZU0P52e";

$(document).ready(function () {
    initButtons(topics);
    $('#submit-button').on("click", function (event) {
        event.preventDefault();
        addToArray($('#newSearch').val());
    }); //end of add button on click

    $('.searchButton').on("click", function () {
        console.log($(this).attr("data"));
        giphySearch($(this).attr("data"))
    })
    $('.imgDiv').on("click", function () {
        let working = $(this).html();
        console.log(working);
    })



}); //end of document ready
$(document).on("click", ".giphyImage", function () {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
})


function giphySearch(searchTerm) {
    $('.gif-div').empty();
    let queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=" + APIKEY + "&limit=10&rating=pg-13"
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        let posts = response.data;
        console.log(posts);
        $.each(posts, function(i, v){
            let images = v;
            console.log(images);
            let newDiv = $('<div>');
            newDiv.addClass("border rounded imgDiv");
            newDiv.html(`
            <br>
            <img class='giphyImage' src='${images.images.fixed_height_small_still.url}' data-still='${images.images.fixed_height_small_still.url}' data-animate='${images.images.fixed_height_small.url}' data-state="still"></img>
            <p>Rating: ${images.rating}</p>
            `);
            $('.gif-div').append(newDiv);

        });

    });


}


function initButtons(theArray) {
    let buttonDiv = $('.button-div');
    buttonDiv.empty();
    theArray.forEach(element => {
        let newButton = $('<button>');
        newButton.attr("data", element);
        newButton.addClass("btn customButton searchButton");
        newButton.text(element);
        buttonDiv.append(newButton);

    });

}

function addToArray(newItem) {
    topics.push(newItem);
    console.log(topics);
    initButtons(topics);
    $('#newSearch').val('');

}