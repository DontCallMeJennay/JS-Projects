/*
REFACTORING because this code sucks.
What are we doing, exactly?

0.  Get API keys

1.  Geolocation enabled ? Get location and draw map : Display error, slideDown manual search;
    return coordinates;

2.  Query API for local restaurants
    return data set;

3.  For each data point
      Construct list item;
      Make map marker;
    Display updated map

4.  For each list item,
      Add sort function;
      Onclick = get directions;
*/


function initMap() {
    var myKey;
    var bounds;
    var coords;
    var markArr = [];
    $.getJSON("test.json", function(data) {
        myKey = JSON.stringify(data.snippet1);
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

    function addMarker(pos) {
        var mark = new google.maps.Marker({
            map: myMap,
            position: pos.geometry.location,
            title: pos.name + '\n' + pos.vicinity
        });
        bounds.extend(pos.geometry.location);
        markArr.push(mark);
    }

    function drawMap(coords) {

        if (coords) {
            var mapDiv = document.getElementById('map');
            myMap = new google.maps.Map(mapDiv, {
                center: coords,
                zoom: 14
            });
            var marker = new google.maps.Marker({
                position: coords,
                map: myMap,
                title: 'You Are Here'
            });
            myMap.setCenter(coords);
            bounds.extend(coords);
            console.log("Coords: " + JSON.stringify(coords));
            console.log("myMap: " + myMap);
            console.log("bounds: " + JSON.stringify(bounds));
            getSushi(coords, myMap);
        } else {
            $(mapDiv).html('Enter your address or zip code.');
            slideItems(formFields);
            console.log("Coords: " + coords);
            console.log("myMap: " + myMap);
            console.log("bounds: " + bounds);
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

    function sortData(response, status) {
        console.log("sortData() called");
        console.log(response);
        for (var i = 0; i < response.length; i++) {
            var x = response[i];
            if (x.types !== "gas station") {
                addMarker(response[i]);
                $('.target').append('<div class="result" id="listing' + i + '"><a href="#">' + response[i].name + '</a><br>');
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
}

$('#findRestaurants').on('click', function() {
    var address = $('#address').val() + ' ';
    var city = $('#city').val();
    var zipcode = $('#zip').val();
    if (true) {
        var str = (address + city + zipcode).replace(/ /gm, '+');
        console.log(str);
        $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address=' + str + '&key=' + myKey, function(data) {
            var newCoords = {
                lat: data.response[0].geometry.location.lat,
                lng: data.response[0].geometry.location.lng
            };
            console.log("Search coords: " + newCoords);
            if (markArr[0]) {
                for (i = 0; i < markArr.length; i++) {
                    markArr[i].setMap(null);
                }
                markArr = [];
                $('.target').html("");
            }
            myMap.setCenter(newCoords);
            //getSushi(newCoords, myMap);
        });
    }
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


/* ------
        for (var i = 0; i < response.length; i++) {
            var x = response[i];
            if (x.types !== "gas station") {
                //addMarker(response[i]);
                $('.target').append('<div class="result" id="listing' + i + '"><a href="#">' + response[i].name + '</a><br>');
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

------ */
