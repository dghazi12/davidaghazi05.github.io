var moment = $("#dayTime").text(moment().format("dddd, MMMM Do YYYY"));

function getLocalStorage(key) {
    let value = localStorage.getItem(key);
    if (value) {
        $(`#text${key}`).text(value);
    }
}

function dayPlanner() {
    for (let i = 9; i < 18; i++) {

        var row = $(`<div data-time=${i} id='${i}' class="row">`);
        var col1 = $('<div class="col-sm-2"> <p class="workHour">' + timeDisplay(i) + '</p>');
        var col2 = $(`<div class="col-sm-8 past"><textarea id=text${i} class="userInput" placeholder="Add your event here..."></textarea>`);
        var col3 = $(`<div class="col-sm-2"><button class="saveBtn" id=${i}>SAVE<i class="fas fa-save"></i></button>`);

        row.append(col1);
        row.append(col2);
        row.append(col3);

        $(".container").append(row);

        getLocalStorage(i);
    }

    function timeDisplay(hours) {
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        return hours + ':00' + ampm;
    }

    function completedTasks() {
        var currentTime = new Date().getHours();
        for (var i = 9; i < 18; i++) {
            if ($(`#${i}`).data("time") == currentTime) {
                $(`#text${i}`).addClass("present");
            } else if (currentTime < $(`#${i}`).data("time")) {
                $(`#text${i}`).addClass("future");
            } else if ($(`#${i}`).data("time") < currentTime) {
                $(`#text${i}`).addClass("present");
            }
        }
    }

    setInterval(function () {
        completedTasks();
    }, 1000);

};

dayPlanner()

$('.saveBtn').on('click', function () {
    let eventId = $(this).attr('id');
    let eventText = $(this).parent().siblings().children('.userInput').val();
    localStorage.setItem(eventId, eventText);
});