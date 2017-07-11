/* TODO

1. Rewrite showResults() with template literals and make the output more sort-friendly

*/

function initMap() {
    var bounds;
    var coords = getLocation();
    var myKey;
    var markers = [];

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

    function drawMap(coords) {
        if (coords) {
            var mapDiv = document.getElementById('map');
            myMap = new google.maps.Map(mapDiv, {
                center: coords,
                zoom: 12
            });
            var marker = new google.maps.Marker({
                position: coords,
                map: myMap,
                title: 'You Are Here'
            }).setIcon('https://maps.google.com/mapfiles/ms/icons/blue-dot.png');
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


    function sortData(response, status) {
        //make the Results bar flash when it's ready
        $(".target").html("");

        dataObj = response;
        var sortedData = response;
        var resultLimit = response.length;

        showResults(response, resultLimit);

        $("#more").click(function() {
            resultLimit < response.length ? resultLimit++ : resultLimit = result.length;
            showResults(sortedData, resultLimit);
        });

        $("#less").click(function() {
            resultLimit > 1 ? resultLimit-- : resultLimit = 1;
            removeMarkers(myMap);
            showResults(sortedData, resultLimit);
        });

        $("#price").click(function() {
            console.log("$");
            let sort = dataObj.sort(function(a, b) {
                return b.price_level - a.price_level;
            });
            sortedData = sort;
            showResults(sortedData, resultLimit);
        });

        $("#rating").click(function() {
            let sort = dataObj.sort(function(a, b) {
                return b.rating - a.rating;
            });
            sortedData = sort;
            showResults(sortedData, resultLimit);
        });

        $("#open").click(function() {
            let sort = dataObj.sort(function(a, b) {
                return b.open_now - a.open_now;
            });
            sortedData = sort;
            showResults(sortedData, resultLimit);
        });
    }

    function showResults(data, limit) {
        $(".target").html("");
        removeMarkers(myMap);
        console.log(`Limit: ${limit}`);
        for (let i = 0; i < limit; i++) {
            var item = data[i];

                markers.push(createMarker(item));
                console.log(markers[i]);
                markers[i].setIcon('https://maps.google.com/mapfiles/ms/icons/red-dot.png');
                markers[i].setMap(myMap);
                bounds.extend(item.geometry.location);
                console.log(`Price: ${data[i].price_level}`)

                $('.target').append('<div class="result" id="listing' + i + '"><a href="https://www.google.com/maps/dir/' + data[i].name + '">' + data[i].name + '</a><br>');

                if (item.vicinity) {
                    $('#listing' + i).append('<span class="addy">' + data[i].vicinity + '</span><br>');
                }
                if (item.rating) {
                    $('#listing' + i).append('Rating: <span>' + data[i].rating + '</span><br>');
                }
                if (item.price_level) {
                    $('#listing' + i).append('Price: <span>' + data[i].price_level + '</span><br>');
                }
                if (item.opening_hours) {
                    var isOpen = data[i].opening_hours.open_now;
                    if (isOpen) {
                        $('#listing' + i).append('Open now? <span> Yes </span><br>');
                    } else {
                        $('#listing' + i).append('Open now? <span> No </span><br>');
                    }
                }
                $('#listing' + i).append('</div>');
            
        }

        myMap.fitBounds(bounds);

    }

    function createMarker(result) {

        function limitZoom(map) {
            var z;
            map.zoom <= 16 ? z = map.zoom + 2 : z = 12;
            return z;
        }

        var pos = result.geometry.location;
        var marker = new google.maps.Marker({
            clickable: true,
            position: pos,
            map: myMap,
            title: result.name + '\n' + result.vicinity
        });

        marker.addListener("click", function() {
            myMap.panTo(pos);
            var z = limitZoom(myMap);
            myMap.setZoom(z);
        });

        return marker;
    }

    function removeMarkers(map) {
        var max = markers.length;
        for (let i = 0; i < max; i++) {
            markers[i].setMap(null);
        }
        markers = [];
    }

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
            if (markers[0]) {
                for (i = 0; i < markers.length; i++) {
                    markers[i].setMap(null);
                }
                markers = [];
                $('.target').html("");
            }

            var marker = new google.maps.Marker({
                position: coords,
                map: myMap,
                title: 'You Are Here'
            }).setIcon('https://maps.google.com/mapfiles/ms/icons/blue-dot.png');

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
    $(".submenu").hide();

    $("#searchForm > legend").on("click", function() {
        slideItems(formFields);
    });

    slideItems($(".target"));
    $("#results").on("click", function() {
        slideItems($(".target, .submenu"));
    });

    $(".target").slideUp(0);
    slideItems($(".target"));


}
