var moment = $("#dayTime").text(moment().format("dddd, MMMM Do YYYY"));


$(document).ready(function () {
    for (let i = 9; i < 24; i++) {

        //Column 1 
        $('.container').append(`<div class='col-sm-1' id='time'> ${timeDisplay(i)} </div>`);

        //Column 2
        $('.container').append(`<div class='col-sm-10' id='userInput'> <p> <input id='test' placeholder="Add your event here"></p></div>`);

        //Column 3
        $('.container').append(`<button class ='col-sm-1' id='btn' 'submit'></button>` );
    }
})

function timeDisplay(hours) {
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return hours + ':00' + ampm;
}

function updateColors(){

    var currentTime = new Date().getHours();
    
    for (var i = 9; i < 24; i++) { 
     if ($(`#time`).data("time") == currentTime){
        $(`#userInput`).addClass("present");
    } else if ($(`#time`).data("time") < currentTime){
        $(`#userInput`).addClass("present");
    }else if (currentTime < $(`#time`).data("time")) {
        $(`#userInput`).addClass("future");
    }
}
}

