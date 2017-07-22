var assert = require('assert');
var moment = require('./moment');


function checkInput(input) {
    var reg = /\D/g;
    if (!(input.toString())) { return false; }
    if (input.toString().search(reg) >= 0) {
        return false;
    }
    return true;
}

function calculateDueDate(testInput) {
    var m = testInput[0];
    var d = testInput[1];
    var y = testInput[2];
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
    //Assuming the date July 21, 2017...
    var thisMonth = 6;
    var thisYear = 2017;
    var endMonth = moment(date).month();
    var endYear = moment(date).year();
    var months = endMonth - thisMonth;
    var years = endYear - thisYear;
    while (months < 0) { 
        months += 12;
        years--;
    }
    while (months > 11) {
        months -=12;
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

describe('checkInput', function() {
    it('returns false when the value is not a positive integer', function() {
        assert.equal(false, checkInput("apple"));
        assert.equal(true, checkInput(7));
        assert.equal(false, checkInput(-5));
        assert.equal(false, checkInput(['x', 'y', 'z', 1, 2, 3]));
        assert.equal(false, checkInput({ key1: "red", key2: "orange", key3: "yellow" }));
        assert.equal(false, checkInput(''));
    });
});

describe('calculateDueDate', function() {
    it('returns "Invalid date" for nonsense dates', function() {
        assert.equal('Invalid date', calculateDueDate(['18', '39', '1105']));
        assert.equal('Invalid date', calculateDueDate(['2017', '19', '9']));
        assert.equal('Invalid date', calculateDueDate(['0', '0', '2109']));
    });

    it('returns a correctly formatted date', function() {
        assert.equal("2017-08-20", calculateDueDate(['8', '20', '2017']));
        assert.equal("2017-11-05", calculateDueDate(['11', '5', '2017']));
        assert.equal("2018-01-03", calculateDueDate(['1', '3', '2018']));

    });
});

describe('adjustDate', function() {
    it('adjusts the end date to account for days in each month', function() {
        assert.equal("2017-10-04", adjustDate("2017-10-05")); //-1 days for September
        assert.equal("2017-12-04", adjustDate("2017-12-06")); //-2 days for September and November
        assert.equal("2017-08-20", adjustDate("2017-08-20")); //No change for July & August
        assert.equal("2018-03-01", adjustDate("2018-03-06")); //-5 days for September, November, February
        assert.equal("2018-02-26", adjustDate("2018-03-03")); //-5 days for September, November, February
        //-5 days for September, November, February, -7 days for 1 year);

    });
});