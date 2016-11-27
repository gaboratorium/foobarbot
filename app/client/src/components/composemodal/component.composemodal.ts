import { ISnippet } from "./../../interfaces/ISnippet";
import * as fs from "fs";
import { BusComponent } from "./../bus/component.bus";

// Component
export const ComposeModalComponent = {

    // Component properties
    name: "modal",
    template: fs.readFileSync(__dirname + '/component.composemodal.html', 'utf8'),

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

    components: {
        "bus": BusComponent
    },

    // Component methods
    methods: {
        postSnippet: function(){
            
            // Create snippet object
            var snippet: ISnippet = {
                snippetId: null,
                userId: null,
                snippetCode: this.composeform__snippet,
                tag1: this.composeform__tag1,
                tag2: this.composeform__tag2,
                tag3: this.composeform__tag3,
                readme: this.composeform__readme,
                vendor: false
            }

            // Dispatch postSnippet action
            this.$store.dispatch({
                type: "postSnippet",
                snippet: snippet
            }).then((response: any) => {
                BusComponent.$emit("showSnackbar", "Your snippet has been posted succesfully.", "success");
            });
            this.$emit("close");

            
        },

        closeModal: function(){

            this.$emit("close");
        }
    }
}