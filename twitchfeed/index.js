$("document").ready(function() {

var fccArr = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"].sort();
var streamArr = [];

function lookupStreamer(streamer, i){
  $.ajax({
    type: "GET",
    dataType: "json",
    url: "https://wind-bow.gomix.me/twitch-api/users/" + streamer,
    success: function(data){
        if(data.display_name){
          var logo = data.logo;
          var chan = data.display_name;
          var url = "https://twitch.tv/" + data.name;
          $('.logo').append('<div class="off" id="logo' + i + '"><img src="' + logo + '" alt="streamer logo"></div>');
          $('.streamer').append('<div class="off names" id="chan' + i + '"><a href="' + url + '">' + chan + '</a></div>');
          $('.status').append('<div class="off" id="stat' + i + '">' + chan + " is offline" + '</div>');
        } else {
          //console.log(streamer + " is not found");
          $('.logo').append('<div class = "off invalid" id="logo' + i + '"></div>');
          $('.streamer').append('<div class = "off invalid" id="chan' + i + '">' + streamer + '</div>');
          $('.status').append('<div class = "off invalid" id="stat' + i + '">' + data.message + '</div>');
     }
   }
  });
}

function getfCC(i) {
  var streamer = fccArr[i];
  $.ajax({
    type: "GET",
    dataType: "json",
    url: "https://wind-bow.gomix.me/twitch-api/streams/" + streamer,
    success: function(data){
      //console.log(data);
      if(data.stream) {
      var logo = data.stream.channel.logo;
      var chan = data.stream.channel.display_name;
      var url = data.stream.channel.url;
      var status = data.stream.channel.status;
        //console.log(streamer + " is online");
        $('.logo').append('<div class="on" id="logo' + i + '"><img src="' + logo + '" alt="streamer logo"></div>');
        $('.streamer').append('<div class="on names" id="chan' + i + '"><a href="' + url + '">' + chan + '</a></div>');
        $('.status').append('<div class="on" id="stat' + i + '"><a href="' + url + '">' + status + '</a></div>');
      } else {
        lookupStreamer(streamer, i);
        }
     },
  });
}

  $("#filter").on("click", function() {
    $("#filter").toggleClass("litUp");
    var junk = document.getElementsByClassName("off");
    for (var i=0; i < junk.length; i++) {
      $(junk[i]).toggle();
    }
  });


for (var j=0; j < fccArr.length; j++) {
  getfCC(j);
}

});