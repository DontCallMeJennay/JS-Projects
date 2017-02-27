$('document').ready(function() {
  "use strict";

	var shortf = 'MMMM Do YYYY';
	var longf = 'MMMM Do YYYY, h:mm:ss a';
	var rightNow = moment().format(longf);
	var endDate;

	$('.today').html(rightNow);
	$('#rect2, #rect3, #rect4, #rect5, #rect6').hide();
	$('#itemID').focus();


////Assembles the date from #rect2 inputs
	function assembleDate() {
		var mm = $('#month').val();
		var dd = $('#day').val();
		var yy = $('#year').val();
		var hh = $('#dueByH').val();
		if (hh < 12) {
			hh = Number(hh) + 12;
		}
		if (hh.length < 2) {
		    hh = '0' + hh;
		}
		var mi = $('#dueByM').val();
		if (dd.length < 2) {
		    dd = '0' + dd;
		}
		if (mm.length < 2) {
		    mm = '0' + mm;
		}
		var dateStr = yy + mm + dd;
		var timeStr = ' ' + hh + ':' + mi + ':00';
		var endStr = dateStr + timeStr;

		return endStr;
	}


////Finds the difference between dates, converts to a valid time, and prints it in English.
////Probably doing this the hard way.
  function calcTimeLeft(date) {
    var nowArr = moment().toArray();
    var thenArr = moment(date).toArray();
    var timeArr = [];
    for (var i = 0; i < 5; i++) {
      timeArr.push(thenArr[i] - nowArr[i]);
      //console.log('raw timeArr: ' + timeArr);
    }
    
    ////Converting minutes to hours, hours to days, etc.
    if (timeArr[4] < 0) {
      timeArr[4] += 60;
      timeArr[3]--;
    }
    
    if (timeArr[3] < 0) {
      timeArr[3] += 24;
      timeArr[2]--;
    }

    if (timeArr[2] < 0) {
      timeArr[2] += 31;
      timeArr[1]--;
    }
    
    if (timeArr[2] > 30) {
      timeArr[2] -= 31;
      timeArr[1]++;
    }
      
    if (timeArr[3] > 23) {
      timeArr[3] -= 24;
      timeArr[2]++;
    }

    if (timeArr[4] > 59) {
      timeArr[4] -= 60;
      timeArr[3]++;
    }

    ////Displaying time left
    if (timeArr[0] < 0) {
      $('#dueResults').html("Sorry, you missed the deadline!");
      return;
    } else if (timeArr[1] > 0) {
      	$('#limit').html(' in ' + timeArr[1] + ' month(s) and ' + timeArr[2] + ' days');    
    } else if (timeArr[2] >= 3) {
      	$('#limit').html(' in ' + timeArr[2] + ' days');
    } else {
      	$('#limit').html(timeArr[2] + ' days, ' + timeArr[3] + ' hours, and ' + timeArr[4] + ' minutes ');
    }
  }

	////Checks whether the input is a valid number
	function numCheck(n) {
	    var reg = /\D/gi;
	    var x = n.match(reg);
	    if (x !== null && x !== NaN) {
	      alert('Please enter a valid number');
	      return false;
	    } else {
	      return true;
	    }
	  }

	////Calculates how many non-business days are within the date range
	function calcBizDays(x, y) {
	    var a = 0;
	    for (var i = 0; i < x; i++) {
	      var dayCheck = moment().add(i, 'day').day();
	      if (dayCheck === 0 || dayCheck === 6) {
	        a++;
	      }
   		}
	    var b = 0;
	    for (var j = x; j <= y; j++) {
	      var dayCheck = moment().add(j, 'day').day();
	      if (dayCheck === 0 || dayCheck === 6) {
	        b++;
	      }
	    }
	    var c = [x += a, y += (b + a)];
	    return c;
  	}


////Button controls
  $('#step1').on('click', function() {
    var issue = $('#itemID').val();
    $('.results').html(issue);
    $('#rect2').show();
    $('#month').focus().on('focus', function() {
          document.body.scrollTop = $(this).offset().top;
        });
  });
  
  $('#step2').on('click', function() {
    var m = $('#month').val();
    var d = $('#day').val();
    var y = $('#year').val();
    if (m === '' || d === '' || y === '') {
      alert('Please enter a complete date');
    } else {
    
    if (numCheck(m) && numCheck(d) && numCheck(y)) {
      if ($('#specific').is(':checked')) {
        $('#rect4').show();
        $('#dueByH').focus().on('focus', function() {
          document.body.scrollTop = $(this).offset().top;
        });
        
      } else if ($('#range').is(':checked')) {
        $('#rect3').show();
        $('#minDays').focus().on('focus', function() {
          document.body.scrollTop = $(this).offset().top;
        });
      } else {
        alert('Please select an option.');
      }
    }
    }
  });

  $('#step3').on('click', function() {
    var deadline = assembleDate();
    if ($('#noTime').is(':checked')) {
      $('#rect6').show();
      $('#rect1, #rect2, #rect3, #rect4').hide();
      $('#limit').html(calcTimeLeft(deadline));

    } else if ($('#yesTime').is(':checked')) {
      if (numCheck($('#dueByH').val()) && (numCheck($('#dueByM').val()))) {
        $('#rect1, #rect2, #rect3, #rect4').hide();
        $('#rect6').show();
        $('#limit').html(calcTimeLeft(deadline));
      }
    }
  });

  $('#timeFrame').on('click', function() {
    var low = Number($('#minDays').val());
    var high = Number($('#maxDays').val());
    if (numCheck(String(low)) && numCheck(String(high))) {
      var lowEst = moment().add(low, 'days').format(shortf);
      var highEst = moment().add(high, 'days').format(shortf);
      if ($('#business').is(':checked')) {
        var bizDays = calcBizDays(low, high);
        low = bizDays[0];
        high = bizDays[1];

        lowEst = moment().add(low, 'day');
        while(lowEst.day() === 6 || lowEst.day() === 0){
        	lowEst = lowEst.add(1, 'day');
   		}
   		lowEst = lowEst.format(shortf);

        highEst = moment().add(high, 'day');
        while(highEst.day() === 6 || highEst.day() === 0){
        highEst = highEst.add(1, 'day');
    	}
		highEst = highEst.format(shortf);
        
        

        $('#rect4, #rect3, #rect2, #rect1').hide();
        $('#rect5').show();
        $('#low').html(lowEst);
        $('#high').html(highEst);

      } else {
        $('#rect4, #rect3, #rect2, #rect1').hide();
        $('#rect5').show();
        $('#low').html(lowEst);
        $('#high').html(highEst);
      }
    }
  });

  $('#reset1, #reset2').on('click', function() {
    $('.today').html(rightNow);
    $('#limit, #low, #high').html('');
    $('#rect1').show();
    $('#rect2, #rect3, #rect4, #rect5, #rect6').hide();
  });

  $("#tweet1").on("click", function() {
    var text = $('#rangeResults').text();
    var tweety = encodeURI("https://twitter.com/intent/tweet?text=" + 'Note: ' + text + "&hashtags=ItsDueWhen");
    window.open(tweety, '_blank');
  });

  $("#tweet2").on("click", function() {
    var text = $('#dueResults').text();
    var tweety = encodeURI("https://twitter.com/intent/tweet?text=" + 'Note: ' + text + "&hashtags=ItsDueWhen");
    window.open(tweety, '_blank');
  });

	$('#month').val(moment().month()+1);
	$('#day').val(moment().date());
	$('#year').val(moment().year());
	console.log(moment().day());
});