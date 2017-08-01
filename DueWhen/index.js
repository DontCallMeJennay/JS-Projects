$('document').ready(function() {

    function checkInput(input, min, max) {
        if(input < min || input > max) {
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
        if (checkInput(y, 2017, 2020) && checkInput(m, 1, 11) && checkInput(d, 1, 31)) {
            return dueDate;
        }
        
    }

    function calculateDueTime() {
        var h = $('#dueByH').val(), mm = $("#dueByM").val();
        h ? h = h : h = "12";
        mm ? mm = mm : mm = "00";
        var dueTime = h + mm;
        $('#PM').is(':checked') ? dueTime += " p" : dueTime += " a";
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
        min = moment().add(min, "days");
        max = moment().add(max, "days");
        while(moment(min).day() === 0 || moment(min).day() === 6) {
            min = moment(min).add(1, "days");
        }
        while(moment(max).day() === 0 || moment(max).day() === 6) {
            max = moment(max).add(1, "days");
        }
        $("#low").html(min.format("MMMM Do YYYY"));
        $("#high").html(max.format("MMMM Do YYYY"));
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
        if(dueDate) {
        var dueTime = calculateDueTime();
        var final = calculateTimeLeft(dueDate, dueTime);
        if ($('#noTime').is(':checked')) {
            $('.rectangle:not(#rect6)').slideUp(400);
            $('#rect6').delay(500).slideDown();
            var str = "";
            if (final[0]) { str += `${final[0]} years <br />`; }
            if (final[1]) { str += `${final[1]} months <br />`; }
            if (final[2]) { str += `${final[2]} days <br />`; }
            $("#limit").html(str);
            checkIfValidAnswer(final);
        } else {
            $('.rectangle:not(#rect6)').slideUp(400);
            $('#rect6').delay(500).slideDown();
            var str = "";
            if (final[0]) { str += `${final[0]} years <br />`; }
            if (final[1]) { str += `${final[1]} months <br />`; }
            if (final[2]) { str += `${final[2]} days <br />`; }
            if (final[3]) { str += `${final[3]} hours <br />`; }
            if (final[4]) { str += `${final[4]} minutes<br />`; }
            $("#limit").html(str);            
            checkIfValidAnswer(final);
        }
    } else {
        alert("Please enter a valid date.");
        $("#rect2").show();
        $(".rectangle:not(#rect2)").hide();
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