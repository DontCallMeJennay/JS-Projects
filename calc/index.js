$(document).ready(function() {
  console.clear();
  var numArr = [];
  var itemArr = [];
  var number = "";
  var mem = "";

  $('#numbers button').not('#clear, #allclear, #mem, #abs').on('click', function() {
    number = $(this).text();
    numArr.push(number);
    $('#calcText').val(numArr.join(''));
    //console.log('numArr: ' + numArr);
  });

  $('#operators button').not('#equals').on('click', function() {
    var sign = $(this).html();
    $('#calcText').val(sign);
    itemArr.push(numArr.join(""));
    if (itemArr.length >= 2) {
      var opString = itemArr.join("");
      var answer = eval(opString).toString();
      //console.log('opString: ' + opString);
      //console.log('answer: ' + answer);
      itemArr = [answer];
    }

    itemArr.push(sign);
    numArr = [];
    //console.log('itemArr: ' + itemArr);
    //console.log('numArr: ' + numArr);
  });

  $('#equals').on('click', function() {
    itemArr.push(numArr.join(""));
    var opString = itemArr.join("");
    var answer = eval(opString);
    answer = Math.round(answer * 100000) / 100000;
    if (answer !== 0 && Boolean(answer) !== true) {
      $('#calcText').val('E');
    } else {
      numArr = [answer];
      itemArr = [];
      $('#calcText').val(answer);
    }
    //console.log('numArr: ' + numArr);
    //console.log('itemArr: ' + itemArr);
  });

  $('#abs').on('click', function() {
    var x = itemArr.length + 1;
    //console.log('x = ' + x);
    var y = numArr.join("");
    //console.log('y = ' + y);
    y = -y;
    numArr = [y];
    $('#calcText').val(y);
    //console.log(itemArr);
  });

  $('#clear').on('click', function() {
    number = "";
    numArr = [];
    $('#calcText').val('0');
  });

  $('#allclear').on('click', function() {
    number = "";
    numArr = [];
    itemArr = [];
    $('#calcText').val('0');
  });

  $('#mem').on('click', function() {
    if (mem === "") {
      mem = $('#calcText').val();
      $('#calcText').val('saved: ' + mem);
      numArr = [];
    } else {
      if (mem !== 0) {
        $('#calcText').val('retrieved: ' + mem);
        numArr.push(mem);
        mem = "";
      }
    }
  });
});