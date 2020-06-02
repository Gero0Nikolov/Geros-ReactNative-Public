/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';

import ScreensStack from './components/ScreensStack/ScreensStack.js';
import PushNotificationManager from './assets/scripts/PushNotificationManager.js';

const App: () => React$Node = () => {
	return (
		<>
			<PushNotificationManager>
				<ScreensStack />
			</PushNotificationManager>
		</>
	);
};

export default App;
