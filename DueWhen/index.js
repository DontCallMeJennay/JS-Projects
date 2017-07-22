$('document').ready(function() {

    function checkInput(input) {
        var reg = /\D/g;
        if (!(input.toString())) { return false; }
        if (input.toString().search(reg) >= 0) {
            //alert(input + " is not a valid input.");
            return false;
        }
        return true;
    }

    function calculateDueDate() {
        var m = $("#month").val();
        var d = $('#day').val();
        var y = $('#year').val();
        var dueDate = "";
        y.length === 2 ? dueDate += "20" + y : dueDate += y;
        m.length === 1 ? dueDate += "0" + m : dueDate += m;
        d.length === 1 ? dueDate += "0" + d : dueDate += d;
        dueDate = moment(dueDate).format('YYYY-MM-DD');
        if (checkInput(y) && checkInput(m) && checkInput(d)) {
            if (moment().month() !== moment(dueDate).month()) {
                dueDate = adjustDate(dueDate);
            }

            return dueDate;
        }
    }

    function adjustDate(date) {
        var thisMonth = moment().month();
        var thisYear = moment().year();
        var endMonth = moment(date).month();
        var endYear = moment(date).year();
        var months = endMonth - thisMonth;
        var years = endYear - thisYear;
        while (months < 0) {
            months += 12;
            years--;
        }
        while (months > 11) {
            months -= 12;
            years++;
        }
        console.log(`${years} years and ${months} months`);
        var diff = 0;

        //Default month length is 31.
        for (var i = 0; i < months; i++) {
            var month = i + thisMonth;
            if (month > 11) {
                month -= 12;
            }
            if (month == 1) {
                diff += 3;
            }
            //thirty days has September...
            if (month === 8 || month === 3 || month === 5 || month === 10) {
                diff += 1;
            }
        }
        date = moment(date).subtract(diff, "days").format("YYYY-MM-DD");
        return date;
    }

    function calculateDueTime() {
        var dueTime = $('#dueByH').val() + $("#dueByM").val();
        if (!(dueTime)) { dueTime = "1200"; }
        $('#PM').is(':checked') ? dueTime += "p" : dueTime += "a";
        dueTime = moment(dueTime, "hmm A").format("HH:mm");
        return dueTime;
    }

    function calculateTimeLeft(dueDate, dueTime) {
        var dateTime = dueDate + " " + dueTime;
        var difference = [
            moment(dateTime).year() - moment().year(),
            moment(dateTime).month() - moment().month(),
            moment(dateTime).date() - moment().date(),
            moment(dateTime).hour() - moment().hour(),
            moment(dateTime).minute() - moment().minute()
        ];
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
        if ($('#noTime').is(':checked')) {
            $('.rectangle:not(#rect6)').slideUp(400);
            $('#rect6').delay(500).slideDown();
            var str = "";
            if (final[0]) { str += `${final[0]} years `; }
            if (final[1]) { str += `${final[1]} months `; }
            if (final[2]) { str += `${final[2]} days `; }
            $("#limit").html(str);
            checkIfValidAnswer(final);
        } else {
            $('.rectangle:not(#rect6)').slideUp(400);
            $('#rect6').delay(500).slideDown();
            var str = "";
            if (final[0]) { str += `${final[0]} years `; }
            if (final[1]) { str += `${final[1]} months `; }
            if (final[2]) { str += `${final[2]} days `; }
            if (final[3]) { str += `${final[3]} hours `; }
            if (final[4]) { str += `${final[4]} minutes`; }
            $("#limit").html(str);
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