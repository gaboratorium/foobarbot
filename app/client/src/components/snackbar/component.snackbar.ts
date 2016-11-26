var fs = require('fs');
var html = fs.readFileSync(__dirname + '/component.snackbar.html', 'utf8');
import { BusComponent } from './../bus/component.bus';
declare const componentHandler: any;

export const SnackbarComponent =  {
	name: "SnackbarComponent",
	template: html,

    created: function(){
        var SnackbarComponent = this;
        BusComponent.$on("showSnackbar", function(message: string, type:string = "default") {
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
			snackbarContainer.MaterialSnackbar.showSnackbar(data);
        }
    }
};