function heyWaitAMinute(){

var markArr = [];

function getLocation() {  
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 60000
    };

    function success(pos) {
      var x = pos.coords.latitude;
      var y = pos.coords.longitude;
      obj = {
        lat: x, 
        lng: y
      };
      bounds = new google.maps.LatLngBounds();
      initMap(obj, bounds);
      console.log(x + ", " + y);
      getSushi(obj);
    }

    function error(err) {
       console.log(err);
    }

   if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error, options);
  }
}

function initMap(obj, bounds) {
if (navigator.geolocation) {
    var mapDiv = document.getElementById('map');
    myMap = new google.maps.Map(mapDiv, {
      center: obj,
      zoom: 14
      });   
    var marker = new google.maps.Marker({
       position: obj,
       map: myMap,
       title: 'You Are Here'
       });    
    myMap.setCenter(obj);
    bounds.extend(obj);
    } else {
    $('#mapDiv').html('Enter your address or zip code');
    console.log('Geolocation failed');
    }
  }

getLocation();

  $('#search').on('click', function() {
    var address, city, zipcode = "";
    var address = $('#address').val() + ' ';
    var city = $('#city').val();
    var zipcode = $('#zip').val();
    if (true) {
      var str = address + city + zipcode;
      str = str.replace(/ /gm, '+');
      $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address=' + str + [KEY], function (data) {
          console.log(data);
          var data = {
          lat: data.results[0].geometry.location.lat,
          lng: data.results[0].geometry.location.lng
          };
          if (markArr[0]) {
            for (i=0; i < markArr.length; i++) {
              markArr[i].setMap(null);
            }
            markArr = [];
            $('.target').html("");
            }
          myMap.setCenter(data);
          getSushi(data);
        });
    }
  });
  
  function addMarker(pos) {
    var mark = new google.maps.Marker({
      map: myMap,
      position: pos.geometry.location,
      title: pos.name + '\n' + pos.vicinity
    });
    bounds.extend(pos.geometry.location);

    markArr.push(mark);
  }  
  
  function getSushi(data) {
    var service = new google.maps.places.PlacesService(myMap);
    var request = {
      location: data,
      radius: '2000',
      keyword: 'sushi'
  };
    service.nearbySearch(request, callback);
    }
    
    
  function callback(results, status) {
    for (var i=0; i < results.length; i++) {
      var x = results[i];
      if (x.types !== "gas station") {
        addMarker(results[i]);
        $('.target').append('<div class="result" id="listing'+i+'"><a href="#">' + results[i].name + '</a><br>');
      if (x.vicinity) {
        $('#listing'+i).append('<span class="addy">' + results[i].vicinity + '</span><br>');
        }
      if (x.rating) {
        $('#listing'+i).append('Rating: <span>' + results[i].rating + '</span><br>');
        }
      if (x.price_level) {
        $('#listing'+i).append('Price: <span>' + results[i].price_level + '</span><br>');
        }
      if (x.opening_hours) {      
        var isOpen = results[i].opening_hours.open_now;
        if (isOpen) {
          $('#listing'+i).append('Open now? <span> Yes </span><br>');
        } else {
          $('#listing'+i).append('Open now? <span> No </span><br>');
          }
                }
                $('#listing'+i).append('</div>');
    }
    }
    google.maps.event.trigger(myMap, 'resize');
    myMap.fitBounds(bounds);
    }
}
