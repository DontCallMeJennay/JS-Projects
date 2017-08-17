$("document").ready(function() {

    function checkTwitch() {
        function getStreamList(user) {
            $.ajax({
                type: "GET",
                dataType: "json",
                url: `https://api.twitch.tv/kraken/users/${user}/follows/channels?limit=100&sortby=last_broadcast`,
                headers: { 'Client-ID': '[YOUR_ID]' },
                success: function(data) {
                    var len = data.follows.length;
                    //console.log(data);
                    for (let i = 0; i < len; i++) {
                        let name = (data.follows[i].channel.name).toString();
                        seeWhosLive(name);
                    }
                }
            });
        }

        function seeWhosLive(name) {
            $.ajax({
                type: "GET",
                dataType: "json",
                url: 'https://api.twitch.tv/kraken/streams/' + name,
                headers: { 'Client-ID': '[YOUR_ID]' },
                success: function(data) {
                    if (data.stream) {
                        var logo = data.stream.channel.logo;

                        var chan = data.stream.channel.display_name;
                        var game = data.stream.channel.game;
                        var url = data.stream.channel.url;
                        var status = data.stream.channel.status;
                        //console.log(streamer + " is online");
                        $('.logo').append(`<div><img src="${logo}" alt="${chan}'s stream logo"></div>`);
                        $('.streamer').append(`<div class="names"><a href="${url}">${chan}</a></div>`);
                        $('.game').append(`<div>${game}</div>`)
                        $('.status').append(`<div><a href="${url}">${status}</a></div>`);
                        //console.log(data);
                    }
                }
            });
        }
        getStreamList('silverrain64');
    }
    checkTwitch();
});

/*
The following code is from the YouTube Data API quickstart guide, with some slight modifications.
See https://developers.google.com/youtube/v3/quickstart/js.
*/

var CLIENT_ID = '[YOUR_ID]';
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"];
var SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';

var authorizeButton = document.getElementById('authorize-button');
var signoutButton = document.getElementById('signout-button');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
    gapi.client.init({
        discoveryDocs: DISCOVERY_DOCS,
        clientId: CLIENT_ID,
        scope: SCOPES
    }).then(function() {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
        getSubscriptions();
    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
    }
}

function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}

function getSubscriptions() {
    gapi.client.youtube.subscriptions.list({
        'part': 'snippet,contentDetails',
        'mine': 'true'
    }).then(function(response) {
        var ylogo = document.getElementById('ylogo');
        var ytuber = document.getElementById('ytuber');
        var ydesc = document.getElementById('ydesc');

        ylogo.innerHTML = '';
        ytuber.innerHTML = '';
        ydesc.innerHTML = '';

        var subs = response.result.items;
        //console.log(subs);
        var len = subs.length;

        for (var i = 0; i < len; i++) {
            var name = subs[i].snippet.title;
            var id = subs[i].snippet.resourceId.channelId;
            var count = subs[i].contentDetails.newItemCount;
            var descr = (subs[i].snippet.description).substring(0, 100) + '...';
            var icon = subs[i].snippet.thumbnails.default.url;
            var a = `<div class='red'><img src=${icon}>${count}</div>`;
            var b = `<div><img src=${icon}></div>`;
            count > 0 ? ylogo.innerHTML += a : ylogo.innerHTML += b;
            ytuber.innerHTML += `<div class='names'><a href='https://www.youtube.com/channel/${id}'>${name}</a></div>`;
            ydesc.innerHTML += `<div>${descr}</div>`;

        }

    });
}