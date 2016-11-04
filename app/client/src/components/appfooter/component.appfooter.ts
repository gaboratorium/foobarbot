var fs = require('fs');
var html = fs.readFileSync(__dirname + '/component.appfooter.html', 'utf8');

export const AppfooterComponent = {
    name: "AppfooterComponent",
    template: html
}