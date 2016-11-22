var fs = require('fs');
var html = fs.readFileSync(__dirname + '/component.user.comments.html', 'utf8');

export const UserCommentsComponent = {
    name: "UserCommentsComponent",
	template: html,
}