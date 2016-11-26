import * as fs from "fs";

export const AppfooterComponent = {
    name: "AppfooterComponent",
    template: fs.readFileSync(__dirname + '/component.appfooter.html', 'utf8')
}