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
            $("#results").html("Geolocation unavailable. Manual search required.");
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
            keyword: 'sushi',
            limit: 10,
            location: coords,
            rankBy: google.maps.places.RankBy.DISTANCE,
            type: 'restaurant'
        };
        service.nearbySearch(request, sortData);
    }

    function sortData(response, status) {
        $("#more, #less, #price, #rating, #open").off();
        $(".target").html("");
        $("#sortBy").html(" sorting by Distance ");

        dataObj = response;
        var sortedData = response;
        var resultLimit = response.length;

        if (dataObj.length > 0) {
            console.log(dataObj.length);
            $("#results").removeClass('notReady');
            $('#indicator').addClass('bright');
            showResults(response, resultLimit);

            $("#more").click(function() {
                $("#count").html(` showing ${resultLimit} results `);
                Math.floor(resultLimit * 2) < response.length ? resultLimit = Math.floor(resultLimit * 2) : resultLimit = response.length;
                showResults(sortedData, resultLimit);
            });

            $("#less").click(function() {
                $("#count").html(` showing ${resultLimit} results `);
                Math.floor(resultLimit / 2) > 1 ? resultLimit = Math.floor(resultLimit / 2) : resultLimit = 1;
                removeMarkers(myMap);
                showResults(sortedData, resultLimit);
            });

            $("#price").click(function() {
                $("#sortBy").html(" sorting by Price ");
                dataObj.forEach(function(item) {
                    if (!(item.price_level)) {
                        item.price_level = -1;
                    }
                });
                let sort = dataObj.sort(function(a, b) {
                    return b.price_level - a.price_level;
                });
                sortedData = sort;
                showResults(sortedData, resultLimit);
            });

            $("#rating").click(function() {
                $("#sortBy").html(" sorting by Rating ");
                let sort = dataObj.sort(function(a, b) {
                    return b.rating - a.rating;
                });
                sortedData = sort;
                showResults(sortedData, resultLimit);
            });

            $("#open").click(function() {
                $("#sortBy").html(" sorting by Hours ");
                dataObj.forEach(function(item) {
                    if (!(item.opening_hours.open_now)) {
                        item.opening_hours.open_now = 0;
                    } else {
                        item.opening_hours.open_now = 1;
                    }
                });
                let sort = dataObj.sort(function(a, b) {
                    return b.opening_hours.open_now - a.opening_hours.open_now;
                });
                sortedData = sort;
                showResults(sortedData, resultLimit);
            });
        }
    }

    function showResults(data, limit) {
        $(".target").html("");
        removeMarkers(myMap);
        $("#count").html(`Found ${limit} results, `);
        for (let i = 0; i < limit; i++) {
            var item = data[i];
            markers.push(createMarker(item));
            markers[i].setIcon('https://maps.google.com/mapfiles/ms/icons/red-dot.png');
            markers[i].setMap(myMap);
            bounds.extend(item.geometry.location);

            $('.target').append(`<div class="result" id="listing${i}"><a href="https://www.google.com/maps/dir/${data[i].name}">${data[i].name}</a><br>`);

            item.vicinity ? $('#listing' + i).append(`<span class="addy">${data[i].vicinity}</span><br>`) : $('#listing' + i).append(`<span class="addy grey">no data</span><br>`);
            item.rating ? $('#listing' + i).append(`Rating: <span>${data[i].rating}</span><br>`) : $('#listing' + i).append(`Rating: <span class="grey">no data</span><br>`);
            item.price_level > 0 ? $('#listing' + i).append(`Price: <span>${data[i].price_level}</span><br>`) : $('#listing' + i).append(`Price: <span class="grey">no data</span><br>`);
            item.opening_hours ? writeHours(item) : $('#listing' + i).append(`<span class="grey">Hours not listed</span>`);

            function writeHours(item) {
                var isOpen = data[i].opening_hours.open_now;
                isOpen ? $('#listing' + i).append('Open now? <span> Yes </span><br>') : $('#listing' + i).append('Open now? <span> No </span><br>');
                $('#listing' + i).append('</div>');
            }
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
        $('#results').addClass('notReady');
        $('#indicator').removeClass('bright');
        e.preventDefault();
        $(formFields).slideUp(300);
        bounds = "";
        coords = "";
        var address = $('#address').val() + ' ';
        var city = $('#city').val();
        var zipcode = $('#zip').val();
        var str = (address + city + zipcode).replace(/ /gm, '+');
        $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address=' + str, function(data) {
            coords = {
                lat: data.results[0].geometry.location.lat,
                lng: data.results[0].geometry.location.lng
            };
            resultLimit = data.results.length;
            myMap.setCenter(coords);
            bounds = new google.maps.LatLngBounds(coords);
            getSushi(coords, myMap);
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
        $('#indicator').toggleClass("bright");
        slideItems($(".target, .submenu"));
    });

    $(".target").slideUp(0);
    slideItems($(".target"));


}