$(document).ready(function() {
  $("#go").on("click", function() {
    var search = $("#searchterm").val().replace(/\ /gm, "%20");
    if (search !== "") {
      $.getJSON("https://en.wikipedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=0&gsrlimit=10&gsrsearch=" +
        search + "&prop=extracts&exintro&explaintext&exsentences=2&exlimit=10&indexpageids=&callback=?",
        function(data) {
          $("#article").html("<p>All links should open in a new tab.</p>");
          for (i = 0; i < data.query["pageids"].length; i++) {
            var id = data.query["pageids"][i];
            var link = encodeURI("http://en.wikipedia.org/wiki/" + data.query.pages[id]["title"]);
            var title = data.query.pages[id]["title"];
            $("#article").append("<div class='result' id='art" + i + "'></div>");
            $("#art" + i).append("<a class='hlink' href='" + link + "' target='_blank'>" + title + "</a><br>");
            if (data.query.pages[id]["extract"] !== undefined) {
              $("#art" + i).append("<p>" + data.query.pages[id]["extract"] + "</p>");
            }
          }

          function postLink(link, i) {
            $("#article").append("<p>" + data.query.pages[id]["title"] + "</p>");
          }
        });
      }
  });

  $("#rand").on("click", function() {
    window.open("http://en.wikipedia.org/wiki/Special:Random", '_blank')
  });

  $("#license").on("click", function() {
    window.open("https://en.wikipedia.org/wiki/Wikipedia:Text_of_Creative_Commons_Attribution-ShareAlike_3.0_Unported_License", '_blank');
  });
});