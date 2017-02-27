$(document).ready(function() {

//Unit conversions    
  function fToC() {
    cTemp = Math.round((fTemp - 32) * (5 / 9));
    $("#temp").html(cTemp);
  }

  function cToF() {
    fTemp = Math.round((cTemp * 1.8) + 32);
    $("#temp").html(fTemp);
  }

//Geolocation
  function getLocation() {
    if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(function(position) {
         var lat = position.coords.latitude;
         var lng = position.coords.longitude;
         getWeatherData("https://api.wunderground.com/api/33a02c71f597125e/conditions/forecast/geolookup/q/" + lat + "," + lng + ".json");
      });

    } else {
      $("#temp").html("Geolocation is not supported by this browser.");
    }
  }

//Query weather API
function getWeatherData(link) {
  $.ajax({
    url : link,
    dataType : "jsonp",
    success : function(data) {
      var location = data.location.city;
      var temp_f = data.current_observation.temp_f;
      var conditions = data.current_observation.weather;
      var cicon = data.current_observation.icon_url;
      $('#city').html(location);
      $('#temp').html(Math.round(temp_f));
      $('#conditions').html(conditions);
      $('#weathericon').html('<img src="' + cicon + '" alt="weather icon"><br>');
      for (var i=0; i < 3; i++) {
          var item = data.forecast.txt_forecast.forecastday[i];
          var icon = item.icon_url;
          var boxx = '#box'+i;
          $(boxx).html(item.title + '<br>' +'<img src="' + icon + '" alt="forecast icon"><br>' + item.fcttext);
      }
      fTemp = temp_f;   
    }
  });
}

//Setting up buttons
  $("#F").on("click", function() {
    cToF();
  });

  $("#C").on("click", function() {
    fToC();
  });

//Setting up zip code search.       
  $("#search").on("click", function() {
    var zipcode = $("#zipbox").val();
    if (zipcode !== "") {
      wAjax("https://api.wunderground.com/api/33a02c71f597125e/conditions/forecast/geolookup/q/" + zipcode + ".json");
    }
  });

  getLocation();

});