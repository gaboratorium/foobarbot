var fs = require('fs');
var html = fs.readFileSync(__dirname + '/component.composemodal.html', 'utf8');

export const ComposeModalComponent = {
    name: "modal",
    template: html,
    data: function(){
        return {
            composeform__snippet: "",
			composeform__tag1: "",
			composeform__tag2: "",
			composeform__tag3: "",
			errorMsg: ""
        }
    },
    methods: {
        postSnippet: function(){
            console.log("YYou are trying t o post a snippet");
            this.$store.dispatch({
                type: "postSnippet",
                snippetText: this.composeform__snippet
            }).then((response: any) => {
                console.log("ok");
            });
            this.$emit("close");

            
        },

        closeModal: function(){
            console.log("You are trying to close the modal...");
            this.$emit("close");
        }
    }
}