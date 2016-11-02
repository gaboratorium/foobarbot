	// Settings component
// Template
var fs = require('fs');
var html = fs.readFileSync(__dirname + '/component.notifications.html', 'utf8');

// chrome type definitions should work, but it doesn't
declare var Notification: any;

// Export global component
export const NotificationsViewComponent =  {
	name: "NotificationsComponent",
	template: html,
	data: () => {
		return {
			notifMessage: '',
			notifDelay: 0,
			notifAudio: '',
			notifications: Array
		};
	},
	created: () => {
		this.notifAudio = new Audio('./../assets/notification.mp3');
		this.loadNotifications();
	},
	methods: {

		loadNotifications: () => {
			console.log('notification dispatches getnotifications');
			
			this.$store.dispatch({
				type: 'getNotifications'
			}).then((response: any) => {
				console.log('Noti comp gets Response: ', response);
				this.notifications = response;
				
				
			}, (fail: any) => {
				//fail
				console.log('failll', fail);
				
			});
		},

		deleteNotifications: () => {

			this.$store.dispatch({
				type: 'deleteNotification'
			}).then((response: any) => {
				console.log(response);
				this.notifications = [];
				
			}, (fail: any) => {
				console.log(fail);
				
			})
		},

		// Push notification
		notifyMe: () => {
			var NotificationComponent = this;
			console.log(NotificationComponent.notifDelay);
			
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
					NotificationComponent.sendNotification();
				}, NotificationComponent.notifDelay * 1000);

			// If notifs are not granted and not denied, ask for permission
			} else if (Notification.permission !== "denied") {
				Notification.requestPermission((permission: any) => {

					// If permission was granted, show notif
					if (permission === "granted"){
						setTimeout(function(){
							var notification = new Notification(NotificationComponent.notifMessage, options);
							NotificationComponent.notifAudio.play();
							NotificationComponent.sendNotification();
						}, NotificationComponent.notifDelay * 1000);
					}
				});
			}
	  	},

		sendNotification: () => {
			var NotificationComponent = this;
			this.$store.dispatch({
				type: "postNotification",
				notificationMessage: NotificationComponent.notifMessage
			}).then((response: any) => {
				console.log('Notification component recieves response:', response);
				this.loadNotifications();
			}, (fail: any) => {
				console.log('Notification component request went wrong', fail);
				
			});
		}
	}
};