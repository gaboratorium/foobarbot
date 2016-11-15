var fs = require('fs');
var html = fs.readFileSync(__dirname + '/component.user.stars.html', 'utf8');

export const UserStarsComponent = {
    name: "UserStarsComponent",
	template: html,
}