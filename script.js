var moment = $("#dayTime").text(moment().format("dddd, MMMM Do YYYY"));

function getLocalStorage(key) {
    let value = localStorage.getItem(key);
    if (value) {
        $(`#text${key}`).text(value);
    }
}

$(document).ready(function () {
    for (let i = 9; i < 18; i++) {

        $('.container').append($(`<div data-time=${i} id='${i}'>`));
        $('.container').append($('<div class="col-sm-2"> <p class="workHour">' + timeDisplay(i) + '</p>'));
        $('.container').append($(`<div class="col-sm-8"> <textarea id=text${i} placeholder="Add your event here..."></textarea>`));
        $('.container').append($(`<div class="col-sm-2"><button class="btn" id=${i}><i class="fas fa-save"></i></button>`));

        getLocalStorage(i)
    }
})

function timeDisplay(hours) {
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return hours + ':00' + ampm;
}

timeDisplay();

function completedTasks() {
    var currentTime = new Date().getHours();
    for (var i = 9; i < 24; i++) {
        if ($(`#${i}`).data("time") == currentTime) {
            $(`#text${i}`).addClass("present");
        } else if ($(`#${i}`).data("time") < currentTime) {
            $(`#text${i}`).addClass("present");
        } else if (currentTime < $(`#${i}`).data("time")) {
            $(`#text${i}`).addClass("future");
        }
    }
}

setInterval(function () {
    completedTasks();
}, 1000);