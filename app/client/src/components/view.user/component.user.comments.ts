import * as fs from "fs";

export const UserCommentsComponent = {
    name: "UserCommentsComponent",
	template: fs.readFileSync(__dirname + '/component.user.comments.html', 'utf8'),
}