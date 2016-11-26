import * as fs from "fs";

declare var Notification: any;

export const NotificationsViewComponent =  {
	name: "NotificationsComponent",
	template: fs.readFileSync(__dirname + '/component.notifications.html', 'utf8'),
	data: function(){
		return {
			formNotifMessage: '',
			formNotifDelay: 0,
			notifAudio: '',
			notifications: Array,
			dataStatus: String
		};
	},
	created: function(){

		this.dataStatus = "loading";
		this.notifAudio = new Audio('./../assets/notification.mp3');

		// Load content if userToken is set
		if (this.$store.getters["mainstore/userToken"] !== undefined){
			this.loadNotifications();
		} else {
			// Interval attempts
			var attempt: number = 0;
			var maxAttempt: number = 8;
			var attemptSpeed = 800;

			// Start timer
			var myTimer = setInterval(()=>{
				
				// Stop timer if userToken is set
				if (this.$store.getters["mainstore/userToken"] !== undefined) {
					this.loadNotifications();
					clearInterval(myTimer);	
				} 

				// Stop timer if max attempt number reached
				if (attempt == maxAttempt) {
					clearInterval(myTimer);
					this.dataStatus = "failed";
				}

				attempt++;

			}, attemptSpeed);
		}
	},
	methods: {



		loadNotifications: function() {
			this.$store.dispatch({
				type: 'getNotifications'
			}).then((response: any) => {
				this.notifications = response;
				this.dataStatus = "loaded";
			}, (fail: any) => {
				this.dataStatus = "failed";
				
			});
		},

		deleteNotifications: function(){

			this.$store.dispatch({
				type: 'deleteNotification'
			}).then((response: any) => {
				this.notifications = [];
			}, (fail: any) => {

			})
		},

		// Push notification
		notifyMe: function(){
			var NotificationComponent = this;
			
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
					var notification = new Notification(NotificationComponent.formNotifMessage, options);
					NotificationComponent.notifAudio.play();
					NotificationComponent.sendNotification();
				}, NotificationComponent.formNotifDelay * 1000);

			// If notifs are not granted and not denied, ask for permission
			} else if (Notification.permission !== "denied") {
				Notification.requestPermission((permission: any) => {

					// If permission was granted, show notif
					if (permission === "granted"){
						setTimeout(function(){
							var notification = new Notification(NotificationComponent.formNotifMessage, options);
							NotificationComponent.notifAudio.play();
							NotificationComponent.sendNotification();
						}, NotificationComponent.formNotifDelay * 1000);
					}
				});
			}
	  	},

		sendNotification: function(){
			var NotificationComponent = this;
			this.$store.dispatch({
				type: "postNotification",
				notificationMessage: NotificationComponent.formNotifMessage
			}).then((response: any) => {
				this.loadNotifications();
			}, (fail: any) => {
				
			});
		}
	}
};