
$('document').ready(function() {

    function checkInput(val) {
        var reg = /\D/g;
        if (val.match(reg) || val === "" || !val) {
            alert(val + " is not a valid input.");
            return false;
        }
        return true;
    }

    function calculateDueDate() {
        var m = $("#month").val();
        var d = $('#day').val();
        var y = $('#year').val();
        var dueDate = y + " " + m + " " + d;
        if (checkInput(y) && checkInput(m) && checkInput(d)) {
            dueDate = moment(dueDate).format('MM DD YYYY');
            if (moment().month() !== moment(dueDate).month()) {
                dueDate = adjustDate(dueDate);
            }
            //console.log(dueDate);
            return dueDate;
        }
    }

    function adjustDate(date) {
        var thisMonth = moment().month();
        var endMonth = moment(date).month()
        //Default month length is 31.
        for (var i = thisMonth; i < endMonth; i++) {
            if (i === 1) {
                moment(date).subtract(3, "days");
                //console.log("subtracted 3 days");
            }
            //thirty days has September...
            if (i === 8 || i === 3 || i === 5 || i === 10) {
                moment(date).subtract(1, "days");
                //console.log("subtracted 1 day for " + (i + 1));
            }
        }
        return date;
    }

    function calculateDueTime() {
        var dueTime = $('#dueByH').val() + $("#dueByM").val();
        if (!(dueTime)) { dueTime = "1200"; }
        $('#PM').is(':checked') ? dueTime += "p" : dueTime += "a";
        dueTime = moment(dueTime, "hmm A").format("HH:mm");
        //console.log("dueTime: " + dueTime);
        return dueTime;
    }

    function calculateTimeLeft(dueDate, dueTime) {
        var dateTime = dueDate + " " + dueTime;
        var difference = [            
            moment(dateTime).year() - moment().year(),
            //Bugfix needed: there's a deprecation and/or formatting issue on line 60.
            moment(dateTime).month() - moment().month(),
            moment(dateTime).date() - moment().date(),
            moment(dateTime).hour() - moment().hour(),
            moment(dateTime).minute() - moment().minute()
        ];
        //console.log("rawTimeLeft: " + difference);
        return fixTimeCalc(difference);
    }

    function fixTimeCalc(arr) {

        function rollUnder(arr, i, limit) {
            if (arr[i] < 0) {
                arr[i] += limit;
                arr[i - 1]--;
            }
        }

        function rollOver(arr, i, limit) {
            if (arr[i] > limit) {
                arr[i] -= limit + 1;
                arr[i - 1]++;
            }
        }

        rollUnder(arr, 4, 60);
        rollUnder(arr, 3, 24);
        rollUnder(arr, 2, 31);
        rollUnder(arr, 1, 12);

        rollOver(arr, 1, 11);
        rollOver(arr, 2, 30);
        rollOver(arr, 3, 23);
        rollOver(arr, 4, 59);

        //console.log("fixed difference: " + arr);
        return arr;
    }

    function calcDateRange(min, max) {
        min = moment().add(min, "days").format("MMMM Do YYYY");
        max = moment().add(max, "days").format("MMMM Do YYYY");
        $("#low").html(min);
        $("#high").html(max);
    }

    function addBusinessDays(num) {
        for (var i = 0; i < num + 2; i++) {
            var check = moment().add(i, "day").day();
            if (check === 0 || check === 6) {
                num++;
            }
        }
        return num;
    }

    function checkIfValidAnswer(arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] < 0) {
                $("#dueResults").html("You have missed the deadline!");
            }
        }
    }

    $("input[type=submit]").click(function(e) { e.preventDefault(); });
    $('.today').html(moment().format("MMMM Do YYYY @ hh:mm A"));
    $(".rectangle:not(#rect1)").hide();

    $("#step1").click(() => {
        var issue = $('#itemID').val();
        $('.results').html(issue);
        $('#rect1').slideUp(400);
        $('#rect2').delay(500).slideDown();
    });

    $('#step2').on('click', function(event) {
        if ($('#specific').is(':checked')) {
            $('#rect2').slideUp(400);
            $('#rect4').delay(500).slideDown();
        } else {
            $('#rect2').slideUp(400);
            $('#rect3').delay(500).slideDown();
        }
    });

    $("#step3").on("click", function(event) {
        var dueDate = calculateDueDate();
        var dueTime = calculateDueTime();
        var final = calculateTimeLeft(dueDate, dueTime);
        //console.log(final);
        if ($('#noTime').is(':checked')) {
            $('.rectangle:not(#rect6)').slideUp(400);
            $('#rect6').delay(500).slideDown();
            $("#limit").html(final[1] + " months and " + final[2] + " days");
            checkIfValidAnswer(final);
        } else {
            $('.rectangle:not(#rect6)').slideUp(400);
            $('#rect6').delay(500).slideDown();
            $("#limit").html(final[1] + " months, " + final[2] + " days, " + final[3] + " hours, and " + final[4] + " minutes");
            checkIfValidAnswer(final);
        }
    });

    $("#step4").on("click", function(event) {
        var min = $("#minDays").val();
        var max = $("#maxDays").val();
        if ($('#calendar').is(':checked')) {
            calcDateRange(min, max);
        } else {
            min = addBusinessDays(min);
            max = addBusinessDays(max);
            calcDateRange(min, max);
        }
        $('.rectangle:not(#rect5)').slideUp(400);
        $('#rect5').delay(500).slideDown();
    });

    $(".reset").click(() => { location.reload(); });
});
