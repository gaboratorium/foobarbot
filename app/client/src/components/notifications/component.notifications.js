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
			notifDelay: 0,
			notifAudio: '',
			notifications: [
				{ message: "Hello, I am here" },
				{ message: "Hello, I am here as well" },
				{ message: "Gesundheit, ich bin das notification" }
			]
		};
	},
	created: function(){
		this.notifAudio = new Audio('./../assets/notification.mp3');
		this.$store.dispatch({
			type: 'getNotifications'
		}).then((response) => {
			console.log('Noti comp gets Response: ', response);
			this.notifications = response;
			
		}, (fail) => {
			//fail
			console.log('failll', fail);
			
		});
	},
	methods: {

		// Push notification
		notifyMe: function(e){
			var NotificationComponent = this;
			console.log(NotificationComponent.notifDelay);
			
			e.preventDefault();
			
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
				setTimeout(function(){
					var notification = new Notification(NotificationComponent.notifMessage, options);
					NotificationComponent.notifAudio.play();
				}, NotificationComponent.notifDelay * 1000);

			// If notifs are not granted and not denied, ask for permission
			} else if (Notification.permission !== "denied") {
				Notification.requestPermission((permission) => {

					// If permission was granted, show notif
					if (permission === "granted"){
						setTimeout(function(){
							var notification = new Notification(NotificationComponent.notifMessage, options);
							NotificationComponent.notifAudio.play();
						}, NotificationComponent.notifDelay * 1000);
					}
				});
			}
	  	},

		resetNotifications: function(e) {
			e.preventDefault();
			this.notifications = [];
		}
	}
};