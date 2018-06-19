let topics = ["Hidamari Sketch", "Kill la Kill", "Code Geass", "Neon Genesis Evangelion", "Bakemonogatari", "Joshiraku", "Idolm@ster", "My Hero Academia", "Yuru Camp", "Baccano", "Lucky Star"];
console.log(topics);


$(document).ready(function(){
    initButtons(topics); 
    $('#submit-button').on("click", function(event){
        event.preventDefault();
       addToArray($('#newSearch').val()); 
    });//end of add button on click


});//end of document ready




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