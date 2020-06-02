// Imports
import 'react-native-gesture-handler';
import React, { Component } from 'react';

import HomeScreen from '../HomeScreen/HomeScreen.js';
import SingleArticleScreen from '../SingleArticle/SingleArticle.js';
import SingleProjectScreen from '../SingleProject/SingleProject.js';
import Blog from '../Blog/Blog.js';
import Projects from '../Projects/Projects.js';
import PP from '../Legals/PP.js';
import REST from '../../assets/scripts/REST.js';
import ScreensStackStyles from './Style.js';

import {
    StatusBar,
    SafeAreaView,
    View,
    Text
} from 'react-native'

import {
    NavigationContainer
} from '@react-navigation/native';

import {
    createStackNavigator
} from '@react-navigation/stack';

// Navigator
const Stack = createStackNavigator();

class ScreensStack extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            isConnected: true
        }
    }

    componentDidMount() {
        // Check Network Connection
        this.checkConnection();
    }

    checkConnection() {
        fetch( 
            REST.url + REST.prepareArgs({
                action: "check_connection"
            })
        )
        .then( (response) => response.json() )
        .then( (responseData) => {
            this.setState({
                isConnected: responseData
            });
        } )
        .catch( (error) => {
            this.setState({
                isConnected: false
            });
        } );
    }

    render() {
        if ( this.state.isConnected ) {
            return (
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen
                            name="Home"
                            component={HomeScreen}
                            options={StackStyleOptions( "Welcome to Gero's!" )}
                        />
                        <Stack.Screen
                            name="Single Article"
                            component={SingleArticleScreen}
                            options={StackStyleOptions( "Single Article Page" )}
                        />
                        <Stack.Screen
                            name="Single Project"
                            component={SingleProjectScreen}
                            options={StackStyleOptions( "Single Project Page" )}
                        />
                        <Stack.Screen
                            name="Blog"
                            component={Blog}
                            options={StackStyleOptions( "Blog" )}
                        />
                        <Stack.Screen
                            name="Projects"
                            component={Projects}
                            options={StackStyleOptions( "Projects" )}
                        />
                        <Stack.Screen
                            name="Privacy Policy"
                            component={PP}
                            options={StackStyleOptions( "Privacy Policy" )}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            );
        } else {
            return (
            <>
                <StatusBar barStyle="light-content" />
                <SafeAreaView
                    style={ScreensStackStyles.noConnectionSafeArea}
                >
                    <View
                        style={ScreensStackStyles.noConnectionView}
                    >
                        <Text
                            style={ScreensStackStyles.noConnectionText}
                        >
                            Sorry, no internet!
                        </Text>
                        <Text
                            style={ScreensStackStyles.noConnectionTextSmall}
                        >
                            Connect and restart the app :)
                        </Text>
                    </View>
                </SafeAreaView>
            </>
            );
        }
    }
}

export default ScreensStack

// Styles
function StackStyleOptions( title ) {
    let StackOptions = {
        title: title,
        headerStyle: {
            backgroundColor: '#000000',
        },
        headerTintColor: '#ffffff',
        headerTintStyle: {
            fontWeight: 'normal'
        },
        cardStyle: { backgroundColor: '#ecf0f1' }
    };
    return StackOptions
}