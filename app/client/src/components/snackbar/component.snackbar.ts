var fs = require('fs');
var html = fs.readFileSync(__dirname + '/component.snackbar.html', 'utf8');
import { BusComponent } from './../bus/component.bus';


export const SnackbarComponent =  {
	name: "SnackbarComponent",
	template: html,
    created: function(){
        var SnackbarComponent = this;
        BusComponent.$on("showSnackbar", function(message: string) {
            SnackbarComponent.showSnackbar(message);
        })
    },

    methods: {
        showSnackbar: function(message: string){
            var snackbarContainer = document.querySelector('#snackbar');
			componentHandler.upgradeElement(snackbarContainer);
			var data = {message: message};
			snackbarContainer.MaterialSnackbar.showSnackbar(data);
        }
    }
};