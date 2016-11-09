// Requirements
var fs = require('fs');
var html = fs.readFileSync(__dirname + '/component.composemodal.html', 'utf8');

// Component
export const ComposeModalComponent = {

    // Component properties
    name: "modal",
    template: html,

    // Component data
    data: function(){
        return {
            composeform__snippet: "",
			composeform__tag1: "",
			composeform__tag2: "",
			composeform__tag3: "",
			composeform__readme: "",
			errorMsg: ""
        }
    },

    // Component methods
    methods: {
        postSnippet: function(){
            
            // Create snippet object
            var snippet = {
                snippetCode: this.composeform__snippet,
                tag1: this.composeform__tag1,
                tag2: this.composeform__tag2,
                tag3: this.composeform__tag3,
                readme: this.composeform__readme,
            }

            // Dispatch postSnippet action
            this.$store.dispatch({
                type: "postSnippet",
                snippet: snippet
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