var list = new Vue({
    el: '#todo',
    data: {
        newItem: "",
        tasks: [
            { task: 'Eat a healthy lunch', done: false, edit: true },
            { task: 'Do the laundry', done: false, edit: true },
            { task: 'Complete first Vue project', done: true, edit: false }
        ]
    },
    methods: {
        add: function() {
            if (this.newItem !== '') {
                list.tasks.push({
                    task: this.newItem.trim(),
                    done: false,
                }),
                this.newItem = '';
            }
        },
        save: function() {
            //TODO
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