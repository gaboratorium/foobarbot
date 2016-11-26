import * as fs from "fs";
import { BusComponent } from './../bus/component.bus';
declare const componentHandler: any;

export const SnackbarComponent =  {
	name: "SnackbarComponent",
	template: fs.readFileSync(__dirname + '/component.snackbar.html', 'utf8'),

    created: function(){
        var SnackbarComponent = this;
        BusComponent.$on("showSnackbar", function(message: string, type:string = "default") {
            console.log("Snackbar is about to show up");
            SnackbarComponent.type = "default";
            SnackbarComponent.type = type == "danger" ? "danger" : SnackbarComponent.type;
            SnackbarComponent.type = type == "success" ? "success" : SnackbarComponent.type;
            SnackbarComponent.showSnackbar(message);
        })
    },

    data: function(){
        return {
            type: "default"
        }
    },

    computed: {
        classObject: function(){
            return {
                "mdl-snackbar--danger": this.type == "danger",
                "mdl-snackbar--success": this.type == "success"
            };
        }
    },

    methods: {
        showSnackbar: function(message: string){
            var snackbarContainer: any = document.querySelector('#snackbar');
			var data = {message: message};
			componentHandler.upgradeElement(snackbarContainer);
            setTimeout(function(){
                snackbarContainer.MaterialSnackbar.showSnackbar(data);
            }, 0);
        }
    }
};