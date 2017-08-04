var list = new Vue({
    el: '#todo',
    data: {
        newItem: "",
        tasks: [
            { task: 'Take a shower', done: false, edit: true },
            { task: 'Do the dishes', done: false, edit: true },
            { task: 'Do the laundry', done: false, edit: true },
            { task: 'Learn Vue', done: false, edit: true }
        ]
    },
    methods: {
        add: function() {
            list.tasks.push({
                task: this.newItem,
                done: false,
               
            });
        },
        save: function() {
        	//I had planned on saving to local storage, but now I know I need to read up more on security issues first...
        },
        remove: function(item, index) {
            this.tasks.splice(index, 1);
        }
    },
    computed: {
        noedit: function() {
            return {
                done: this.done,
                noedit: this.edit
            }
        }
    }
});
