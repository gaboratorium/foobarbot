var fs = require('fs');
var html = fs.readFileSync(__dirname + '/component.composemodal.html', 'utf8');

export const ComposeModalComponent = {
    name: "modal",
    template: html
}