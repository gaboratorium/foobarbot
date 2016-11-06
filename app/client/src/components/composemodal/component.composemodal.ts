var fs = require('fs');
var html = fs.readFileSync(__dirname + '/component.composemodal.html', 'utf8');

export const ComposeModalComponent = {
    name: "modal",
    template: html,
    methods: {
        postSnippet: function(){
            console.log("YYou are trying t o post a snippet");
            this.$emit("close");
            
        },

        closeModal: function(){
            console.log("You are trying to close the modal...");
            this.$emit("close");
        }
    }
}