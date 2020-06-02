import React, { Component } from 'react';

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    View,
    Text,
    Dimensions,
    Linking
} from 'react-native';

import MainStyles from '../../assets/styles/Main.js';
import HTMLStyles from '../../assets/styles/HTML.js';
import LegalsStyles from './Style.js';
import REST from '../../assets/scripts/REST.js';
import HTML from 'react-native-render-html';

class PP extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            content: "Legal stuff are coming...",
            date: "..."
        };
    }

    componentDidMount() {
        // Fetch Privacy Policy
        this.fetchPrivacyPolicy();
    }

    async fetchPrivacyPolicy() {
        fetch( 
            REST.url + REST.prepareArgs({
                action: "get_privacy_policy"
            })
        )
        .then( (response) => response.json() )
        .then( (responseData) => {
            if ( responseData != false ) {
                this.setState({
                    content: responseData.content,
                    date: responseData.date
                });
            }
        } )
        .catch( (error) => {
            alert( "No connection! Reconnect and restart the app." );
        } );
    }

    render() {
        // Get Params
        let params = this.props.route.params;

        // Set Page Title
        this.props.navigation.setOptions({
            title: params.title
        });
        
        return(
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <View
                        style={MainStyles.view}
                    >
                        <Text
                            style={[MainStyles.containerTitle, LegalsStyles.title]}
                        >
                            Privacy Policy
                        </Text>
                    </View>
                    <View
                        style={LegalsStyles.dateContainer}
                    >
                        <Text
                            style={LegalsStyles.date}
                        >
                            Last Updated on: {this.state.date}
                        </Text>
                    </View>
                    <View
                        style={LegalsStyles.view}
                    >
                        <HTML 
                            html={this.state.content} 
                            imagesMaxWidth={Dimensions.get('window').width - 40} 
                            tagsStyles={HTMLStyles}
                            onLinkPress={(evt, href) => Linking.openURL(href) }
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
        );
    }
}

export default PP;