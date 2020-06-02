import React from 'react'
import { Platform, View } from 'react-native'
import { Notifications } from 'react-native-notifications'
import GLOBALS from './GLOBALS.js';
import REST from './REST.js';

export default class PushNotificationManager extends React.Component {
	constructor( props ) {
		super( props );
	}

	componentDidMount() {
		this.registerDevice()
		this.registerNotificationEvents()
  	}

  	registerDevice = () => {
		Notifications.events().registerRemoteNotificationsRegistered(event => {
			// Set the Globals with the Device Token for later
			GLOBALS.deviceToken = event.deviceToken;

			// Store Device Token and Platform OS on the Server
			fetch( 
				REST.url + REST.prepareArgs({
					action: "store_notification_id",
					notification_id: event.deviceToken,
					platform: Platform.OS
				})
			)
			.then( (response) => response.json() )
			.then( (responseData) => {
				// Here comes the response
			} )
			.catch( (error) => {
				alert( "No connection! Reconnect and restart the app." );
			} );
		})
		Notifications.events().registerRemoteNotificationsRegistrationFailed(event => {
			console.error(event)
		})

		Notifications.registerRemoteNotifications()
  	}

  	registerNotificationEvents = () => {
		Notifications.events().registerNotificationReceivedForeground((notification, completion) => {
			// Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
			completion({ alert: true, sound: false, badge: false })
		})

		Notifications.events().registerNotificationOpened((notification, completion) => {
			GLOBALS.postID = notification.payload.data.post_id;
			GLOBALS.type = notification.payload.data.type;

			completion()
		})

		Notifications.events().registerNotificationReceivedBackground((notification, completion) => {
			// Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
			completion({ alert: true, sound: true, badge: false })
		})

    	Notifications.getInitialNotification()
			.then(notification => {
				if ( notification ) {
					GLOBALS.postID = notification.payload.data.post_id;
					GLOBALS.type = notification.payload.data.type;
				}
			})
			.catch(err => console.error('getInitialNotifiation() failed', err))
  	}

  	render() {
		const { children } = this.props
		return <View style={{ flex: 1 }}>{children}</View>
  	}
}