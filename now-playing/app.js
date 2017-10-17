Vue.component('tw-result', {
    template: `<tr><td><img :src='logo' :alt='chan + " stream logo"'></td><td class='names'><a :href='url'> {{ chan }} </a></td>
<td> {{ game }} </td> <td class='sm-hide'> <a :href='url'> {{ status }} </a></td></tr>`,
    props: ['logo', 'chan', 'url', 'game', 'status']
})

new Vue({
    el: '#vue-app',
    data: {
        results: [{
                logo: "#",
                chan: "randomChannel1",
                game: "Super Mario Bros.",
                url: "https://www.example.com",
                status: "offline"
            },
            {
                logo: "#",
                chan: "randomChannel2",
                game: "The Legend of Zelda",
                url: "https://www.example.com",
                status: "online"
            }
        ]
    },
    methods: {
        getStreamList: function(user) {
            $.ajax({
                type: "GET",
                dataType: "json",
                url: `https://api.twitch.tv/kraken/users/${user}/follows/channels?limit=100&sortby=last_broadcast`,
                headers: { 'Client-ID': 'kjuxb8d6m4k8sek7vqnfvr3y1694077' },
                success: function(data) {
                    var len = data.follows.length;
                    console.log('getStreamList:');
                    console.log(data);
                    for (let i = 0; i < len; i++) {
                        let name = (data.follows[i].channel.name).toString();
                        seeWhosLive(name);
                    }
                }
            });
        },

        seeWhosLive: function(name) {
            $.ajax({
                type: "GET",
                dataType: "json",
                url: 'https://api.twitch.tv/kraken/streams/' + name,
                headers: { 'Client-ID': 'kjuxb8d6m4k8sek7vqnfvr3y1694077' },
                success: (data) => {
                    if (data.stream) {
                        this.results.logo = data.stream.channel.logo;
                        this.results.chan = data.stream.channel.display_name;
                        this.results.game = data.stream.channel.game;
                        this.results.url = data.stream.channel.url;
                        this.results.status = data.stream.channel.status;
                        //console.log(streamer + " is online");

                    }
                }
            });
        }
    },
    ready() {
        console.log('Ready!');
        //getStreamList('silverrain64');
    }
})