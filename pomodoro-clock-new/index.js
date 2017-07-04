/*
I can't even look. New plan:

{Setup time}
{Working time}
{Break time}

{Setup}
Set directions to indicate "Setup time."
Display a period of time. Default 25 min working, 5 min breaks. Display with 00s.
User can change time settings. Min 5 min, max 60.

{Working}
Adjustment buttons disabled; time ticks down from set time.
At zero, timer stops, resets to user setting, and switches to

{Break}
At zero, timer stops, resets to user setting, and switches to ...

Reset button returns to setup state. All buttons enabled, times reset to 25 and 5.

*/


$(document).ready(function() {

    var tickTock;
    var workTimer = initTimer(25);
    var breakTimer = initTimer(5);
    var worksnd = document.getElementById("soundW");
    var breaksnd = document.getElementById("soundB");

    function setUpTimers() {

        $("#workTime").html(workTimer);
        $("#breakTime").html(breakTimer);
        $("#clockTime").html(workTimer);
        $(".timeBtn").prop("disabled", false);


        $("#addW").on("click", () => {
            workTimer = addTime(workTimer, "m");
            $("#workTime").html(workTimer);
        });

        $("#subW").on("click", () => {
            workTimer = subtractTime(workTimer, "m");
            $("#workTime").html(workTimer);
        });

        $("#addB").on("click", () => {
            breakTimer = addTime(breakTimer, "m");
            $("#breakTime").html(breakTimer);
        });

        $("#subB").on("click", () => {
            breakTimer = subtractTime(breakTimer, "m");
            $("#breakTime").html(breakTimer);
        });

        $("#start").on("click", () => {
            workTime(workTimer);
        });
    }

    function workTime(timer) {
        soundW.play();
        $(".timeBtn").prop("disabled", true);
        $("#activity").html("Working!");
        $("#session").html("Work");
        tickTock = setInterval(() => {
            timer = runClock(timer);
            $("#clockTime").html(timer);
            if (checkIfTimeUp(timer)) {
                clearInterval(tickTock);
                return breakTime(breakTimer);
            }
        }, 1000);

        $("#stop").click(() => {
            clearInterval(tickTock);
            $(".timeBtn").prop("disabled", false);
            $("#activity").html("Paused");
        });


        $("#reset").click(() => {
            //location.reload();
            clearInterval(tickTock);
            workTimer = initTimer(25);
            breakTimer = initTimer(5);
            $("#workTime").html(workTimer);
            $("#breakTime").html(breakTimer);
            $("#clockTime").html(workTimer);
            $(".timeBtn").prop("disabled", false);
            $("#activity").html("Setting the timer");
            $("#session").html("[Task]");


        });
    }

    function breakTime(timer) {
        soundB.play();
        $("#activity").html("Taking a break!");
        $("#session").html("Break");
        tickTock = setInterval(() => {
            timer = runClock(timer);
            $("#clockTime").html(timer);
            if (checkIfTimeUp(timer)) {
                clearInterval(tickTock);
                return workTime(workTimer);
            }
        }, 1000);
    }


    function initTimer(minutes) {
        let timer = moment().minutes(minutes).seconds(00).format("mm:ss");
        return timer;
    }

    function addTime(timer, inc) {
        return moment(timer, "mm:ss").add(1, inc).format("mm:ss");
    }

    function subtractTime(timer, inc) {
        return moment(timer, "mm:ss").subtract(1, inc).format("mm:ss");
    }

    function runClock(timer) {
        return subtractTime(timer, "s");
    }

    function checkIfTimeUp(timer) {
        var m = moment(timer, "mm:ss").minute();
        var s = moment(timer, "mm:ss").second();
        if (m > 0 || s > 0) {
            return false;
        }
        return true;
    }

    setUpTimers();
});
