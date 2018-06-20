
//init topics and API KEY
let topics = ["Hidamari Sketch", "Kill la Kill", "Code Geass", "Neon Genesis Evangelion", "Bakemonogatari", "Joshiraku", "Idolm@ster", "My Hero Academia", "Yuru Camp", "Baccano", "Lucky Star"];
console.log(topics);
const APIKEY = "ucmeVf47TCsuxgRoTwmO2GV5ZZU0P52e";

$(document).ready(function () {
    //init buttons
    initButtons(topics);
    // on submit button click...
    $('#submit-button').on("click", function (event) {
        event.preventDefault();
        //hit that add to array yeet
        addToArray($('#newSearch').val());
    }); //end of add button on click

    

}); //end of document ready

//because i'm dumb and don't know another way: on click for gifs outside of ready
$(document).on("click", ".giphyImage", function () {
    //stolen state check from activity we didn't do
    var state = $(this).attr("data-state");
    if (state === "still") { // if it's still, change to animated
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else { //else vise versa
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

$(document).on("click", ".searchButton", function () { //other method didn't work when adding new elements
    //when you hit a search button, log what you're searching for and search it
    console.log($(this).attr("data"));
    giphySearch($(this).attr("data"))
});


function giphySearch(searchTerm) { //actual search handling
    $('.gif-div').empty(); //empty out gif div first
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=" + APIKEY + "&limit=10&rating=pg-13"
    $.ajax({ //put to gether query url and get
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        let posts = response.data; //make an array from the response data
        console.log(posts);
        $.each(posts, function(i, v){ //jquery each for the posts array
            let images = v; //reassign because why not
            console.log(images);
            let newDiv = $('<div>'); //create new div and give classes
            newDiv.addClass("border rounded imgDiv");
            newDiv.html(`
            <br>
            <img class='giphyImage' src='${images.images.fixed_height_small_still.url}' data-still='${images.images.fixed_height_small_still.url}' data-animate='${images.images.fixed_height_small.url}' data-state="still"></img>
            <p>Rating: ${images.rating}</p>
            `); //construct html and append
            $('.gif-div').append(newDiv);

        });

    });


}


function initButtons(theArray) { //initialize buttons
    let buttonDiv = $('.button-div');
    buttonDiv.empty(); //empty button div so that things don't keep piling up
    theArray.forEach(element => { //using regular foreach because why not
        let newButton = $('<button>');
        newButton.attr("data", element);
        newButton.addClass("btn customButton searchButton");
        newButton.text(element);
        buttonDiv.append(newButton); //create new button for each element etc

    });

}

function addToArray(newItem) { //literally just push new topic to array and create button
    topics.push(newItem);
    console.log(topics);
    initButtons(topics);
    $('#newSearch').val('');

}