	// Settings component
// Template
var fs = require('fs');
var html = fs.readFileSync(__dirname + '/component.notifications.html', 'utf8');

// Export global component
module.exports =  {
	name: "NotificationsComponent",
	template: html,
	data: function(){
		return {
			notifMessage: '',
			notifAudio: ''
		};
	},
	created: function(){
		this.notifAudio = new Audio('./../assets/notification.mp3');
	},
	methods: {
		notifyMe: function(e){
			e.preventDefault();
			console.log('You have requested a notifications');
			
			// Notify user if notifications are not supported
			if (!("Notification" in window)) {
				alert("This browser does not support desktop notification");
				return;
			}

			var options = {
				body: "Project Lines",
      			icon: "http://www.freeiconspng.com/uploads/bell-icon-6.png"
			};

			// If notifications are granted, show notif
			if (Notification.permission === "granted") {
				var notification = new Notification(this.notifMessage, options);
				this.notifAudio.play();

			// If notifs are not granted and not denied, ask for permission
			} else if (Notification.permission !== "denied") {
				Notification.requestPermission((permission) => {

					// If permission was granted, show notif
					if (permission === "granted"){
						var notification = new Notification(this.notifMessage, options);
						this.notifAudio.play();
					}
				});
			}
	  	}
	}
};