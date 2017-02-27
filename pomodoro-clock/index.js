$("document").ready(function() {
  var breakTime = 5;
  var workTime = 25;
  var timeW = new Date();
  var timeB = new Date();
  var ticker;

  timeW.setMinutes(workTime, 0, 0);
  $(".session").html("Work");

  /* Intializing sounds that play when timers start.
  Can't use them here due to CORS rules.
  
  var workSound = document.createElement('audio');
  workSound.src = "#";
  workSound.volume = 0.10;
  workSound.autoplay = false;
  workSound.preLoad = true;

  var breakSound = document.createElement('audio');
  breakSound.src = "#";
  breakSound.volume = 0.10;
  breakSound.autoplay = false;
  breakSound.preLoad = true;
*/

  //Makes clock digits show as, e.g., 01:01 instead of 1:1
  function addZero(i) {
    if (Number(i) < 10) {
      return "0" + String(i);
    } else {
      return i;
    }
  }

  //resets clock
  function resetTimers() {
    breakTime = 5;
    $("#breakTime").html(breakTime);
    timeB.setMinutes(breakTime, 0, 0);
    workTime = 25;
    $("#workTime").html(workTime);
    timeW.setMinutes(workTime, 0, 0);
    $("#clockTime").html(timeW.getMinutes());
    $(".session").html("Work");
    $(".session").css('color','red');
    $(".clock").css('border-color','red');
  }

  //runs timer for either work or break time
  function countDown(t) {
    t.setMinutes(t.getMinutes(),
      t.getSeconds() - 1, 0);
    var min = t.getMinutes();
    var sec = t.getSeconds();
    $("#clockTime").html(addZero(min) + ":" +
      addZero(sec));
    if (min === 0 & sec === 0) {
      switchTimers();
    }
  }

  //toggles between work timer and break timer, awkwardly
  function switchTimers() {
    if (timeW.getMinutes() === 0) {
      clearInterval(ticker);
      timeW.setMinutes(workTime, 0, 0);
      //breakSound.play();
      $(".session").html("Break");
      $(".session").css('color','green');
      $(".clock").css('border-color','green');
      ticker = setInterval(function() {
        countDown(timeB);
      }, 1000);
    } else {
      clearInterval(ticker);
      timeB.setMinutes(breakTime, 0, 0);
      //workSound.play();
      $(".session").html("Work");
      $(".session").css('color','red');
      $(".clock").css('border-color','red');
      ticker = setInterval(function() {
        countDown(timeW);
      }, 1000);
    }
  }

  //button controls
  
  //break timer ++
  $("#addB").on("click", function() {
    if (breakTime < 60) {
      breakTime++;
      timeB.setMinutes(breakTime, 0, 0);
      $("#breakTime").html(breakTime);
    }
  });

  //break timer --
  $("#subB").on("click", function() {
    if (breakTime > 2) {
      breakTime--;
      timeB.setMinutes(breakTime, 0, 0);
      $("#breakTime").html(breakTime);
    }
  });

  //work timer ++
  $("#addW").on("click", function() {
    if (workTime < 60) {
      workTime++;
      timeW.setMinutes(workTime, 0, 0);
      $("#workTime").html(workTime);
      $("#clockTime").html(workTime);
    }
  });

  //work timer --
  $("#subW").on("click", function() {
    if (workTime > 5) {
      workTime--;
      timeW.setMinutes(workTime, 0, 0);
      $("#workTime").html(workTime);
      $("#clockTime").html(workTime);
    }
  });

  //start, stop, reset
  $("#start").on("click", function() {
    clearInterval(ticker);
    //workSound.play();
    ticker = setInterval(function() {
      countDown(timeW);
    }, 1000);
  });

  $("#stop").on("click", function() {
    clearInterval(ticker);
  });

  $("#reset").on("click", function() {
    clearInterval(ticker);
    resetTimers();
  });

  //initial timer setup
  resetTimers();
});