$(document).ready(function() {

    var tickTock;
    var workTimer = initTimer(25);
    var breakTimer = initTimer(5);
    var mainTimer;
    var working = true;
    var worksnd = document.getElementById("soundW");
    var breaksnd = document.getElementById("soundB");
    var smallScreen;

    if ($(window).width() < 450) {
        $('#clock').slideUp(0);
        smallScreen = true;
    }

    function setUpTimers() {
        $('#addW, #subW, #addB, #subB, #start, #stop, #reset').off();
        working = true;
        $('#activity').html('Setting your timers');
        if(tickTock) { clearInterval(tickTock); }
        $("#workTime").html(workTimer);
        $("#breakTime").html(breakTimer);
        $("#clockTime").html("--:--");
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

        $("#start").one("click", () => {
            animateStart();
            $(".timeBtn").prop("disabled", true);
            mainTimer = workTimer;
            workTime(mainTimer);
        });
    }

    function workTime(timer) {
        working = true;
        $("#start").off();
        soundW.play();
        $("#activity").html("Working!");
        $("#session").html("Work");
        tickTock = setInterval(() => {
            timer = runClock(timer);
            $("#clockTime").html(timer);
            if (checkIfTimeUp(timer)) {
                clearInterval(tickTock);
                mainTimer = breakTimer;
                breakTime(mainTimer);
            }
        }, 1000);

        $("#stop").one("click", function() {
            animateStop();
            clearInterval(tickTock);
            $(".timeBtn").prop("disabled", false);
            $("#activity").html("Paused");
            $("#start").one("click", () => {
                animateStart();
                $(".timeBtn").prop("disabled", true);
                working === true ? workTime(mainTimer) : breakTime(mainTimer);
            });
        });


        $("#reset").click(() => {
            setUpTimers();
        });
    }

    function animateStop() {
        if (smallScreen) {
            $('#cpanel-top').slideDown(300);
            $('#clock').slideUp(300);
        }
    }

    function animateStart() {
        if (smallScreen) {
            $('#cpanel-top').slideUp(300);
            $('#clock').slideDown(300);
        }
    }

    function breakTime(timer) {
        working = false;
        $("#start").off();
        soundB.play();
        $("#activity").html("Taking a break!");
        $("#session").html("Break");
        tickTock = setInterval(() => {
            timer = runClock(timer);
            $("#clockTime").html(timer);
            if (checkIfTimeUp(timer)) {
                clearInterval(tickTock);
                workTime(workTimer);
            }
        }, 1000);

        $("#stop").one("click", function() {
            $("#start").off();
            animateStop();
            clearInterval(tickTock);
            $(".timeBtn").prop("disabled", false);
            $("#activity").html("Paused");
            $("#start").one("click", () => {
                animateStart();
                $(".timeBtn").prop("disabled", true);
                console.log("Start clicked");
                console.log("Working? " + working);
                working === true ? workTime(mainTimer) : breakTime(mainTimer);
            });
        })
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
        timer = subtractTime(timer, "s");
        mainTimer = timer;
        return timer;
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