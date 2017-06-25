/*
DONE:
Get API keys v/
Geolocation enabled ? Get location and draw map : Display error, slideDown manual search; v/
return coordinates; v/
Query API for local restaurants v/
return data set; v/
For each data point
  Construct list item; v/
  Make map marker; v/
  Display updated map v/

TODO:
1.  Make markers clickable
2.  Make map zoom and center on clicked/touched marker
3.  Make results more relevant; default sort by rating.
4.  Let user choose how many results are displayed
5.  Let user filter results by price, rating, and hours
6.  Let user set range

*/

function initMap() {
    var bounds;
    var coords;
    var myKey;
    var markArr = [];

    $.getJSON("test.json", function(data) {
      myKey = data.snippet1;
    });

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
            coords = obj;
            drawMap(coords);
        }

        function error(err) {
            console.error(err);
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error, options);
        } else {
            $("#msg").html("Geolocation unavailable. Manual search required.");
            slideItems(formFields);
        }
    }

    coords = getLocation();

    function createMarker(hit, i) {
        let loc = hit.geometry.location;
        return new google.maps.Marker({
            clickable: true,
            position: loc,
            map: myMap,
            title: hit.name + '\n' + hit.vicinity
        });
    }

    function drawMap(coords) {
        if (coords) {
            var mapDiv = document.getElementById('map');
            myMap = new google.maps.Map(mapDiv, {
                center: coords,
                zoom: 14
            });
            var marker = new google.maps.Marker({
                clickable: true,
                position: coords,
                map: myMap,
                title: 'You Are Here'
            });
            myMap.setCenter(coords);
            bounds.extend(coords);
            getSushi(coords, myMap);
        } else {
            $(mapDiv).html('Enter your address or zip code.');
            slideItems(formFields);
            console.log('Map draw failed');
        }
    }

    function getSushi(coords, map) {
        var service = new google.maps.places.PlacesService(map);
        var request = {
            location: coords,
            radius: '2000',
            keyword: 'sushi'
        };
        service.nearbySearch(request, sortData);
    }

    function setClick(marker) {
        $(marker).on("click", function() {
            console.log("click");
            myMap.panTo(marker.position);
        });
    }

    function sortData(response, status) {
        $(".target").html("");
        dataObj = {};

        var textBlock = "";
        for (var i = 0; i < response.length; i++) {
            var x = response[i];
            //console.log(x.types);
            if (x["types"].includes("restaurant")) {
                
                setClick(createMarker(response[i]));
                bounds.extend(response[i].geometry.location);

                $('.target').append('<div class="result" id="listing' + i + '"><a href="https://www.google.com/maps/dir/' + response[i].name + '">' + response[i].name + '</a><br>');

                if (x.vicinity) {
                    $('#listing' + i).append('<span class="addy">' + response[i].vicinity + '</span><br>');
                }
                if (x.rating) {
                    $('#listing' + i).append('Rating: <span>' + response[i].rating + '</span><br>');
                }
                if (x.price_level) {
                    $('#listing' + i).append('Price: <span>' + response[i].price_level + '</span><br>');
                }
                if (x.opening_hours) {
                    var isOpen = response[i].opening_hours.open_now;
                    if (isOpen) {
                        $('#listing' + i).append('Open now? <span> Yes </span><br>');
                    } else {
                        $('#listing' + i).append('Open now? <span> No </span><br>');
                    }
                }
                $('#listing' + i).append('</div>');
            }

        }

        google.maps.event.trigger(myMap, 'resize');
        myMap.fitBounds(bounds);

    }
    //getDirections();

    $('#findRestaurants').on('click', function(e) {
        e.preventDefault();
        $(formFields).slideUp(300);
        bounds = "";
        coords = "";
        var address = $('#address').val() + ' ';
        var city = $('#city').val();
        var zipcode = $('#zip').val();
        var str = (address + city + zipcode).replace(/ /gm, '+');
        $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address=' + str, function(data) {
            var newCoords = {
                lat: data.results[0].geometry.location.lat,
                lng: data.results[0].geometry.location.lng
            };
            if (markArr[0]) {
                for (i = 0; i < markArr.length; i++) {
                    markArr[i].setMap(null);
                }
                markArr = [];
                $('.target').html("");
            }
            myMap.setCenter(newCoords);
            bounds = new google.maps.LatLngBounds(newCoords);
            getSushi(newCoords, myMap);
        });
    });

    function slideItems(obj) {
        $(obj).toggleClass("show");
        if ((obj).hasClass("show")) {
            (obj).slideDown(300);

        } else {
            $(obj).slideUp(300);
        }
    }

    var formFields = $("form > input, form > button");
    $(formFields).hide();

    $("#searchForm > legend").on("click", function() {
        slideItems(formFields);
    });

    $("#results").on("click", function() {
        slideItems($(".target"));
    });

/*  Debugging function and variables for constructing driving direction GETs

$("*").on('click', function() {
  alert(this + "clicked");
});

  var directionsURL1 = "https://maps.googleapis.com/maps/api/directions/json?origin=";
  var directionsURL2 = coords.lat + "," + coords.lng;
  var destination = response[i].place_id;
  var directionsURL3 = "&destination=" + response[i].geometry.location.lat + "," + response[i].geometry.location.lng;
          
*/

}
