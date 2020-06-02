// Imports
import React, { Component } from 'react';

import {
    View,
    Text,
    TouchableHighlight,
    Image,
    TextInput
} from 'react-native';

import SubscribeStyles from './Style.js';
import GLOBALS from '../../assets/scripts/GLOBALS.js';
import REST from '../../assets/scripts/REST.js';

var _subscribeData = {
    email: ""
}

var _thisSubscribe;

class Subscribe extends Component {
    constructor( props ) {
        super( props );

        _thisSubscribe = this;
        _thisSubscribe.state = {
            email: "",
            isLoading: false
        }
    }

    emailChange( email ) {
        _subscribeData.email = email;

        _thisSubscribe.setState({
            email: email
        });
    }

    subscribe() {
        if ( !_thisSubscribe.state.isLoading ) {
            if ( _subscribeData.email.length > 0 ) {
                _thisSubscribe.setState({
                    isLoading: true
                });

                fetch( 
                    REST.url + REST.prepareArgs({
                        action: "subscribe",
                        email: _subscribeData.email,
                        platform: Platform.OS,
                        device_token: GLOBALS.deviceToken
                    })
                )
                .then( (response) => response.json() )
                .then( (responseData) => {                    
                    _thisSubscribe.setState({
                        isLoading: false
                    });

                    if ( responseData != false ) {
                        if ( responseData == true ) {
                            _thisSubscribe.setState({
                                email: ""
                            });

                            alert( "Subscribed succesfully!" );
                        } else {
                            alert( responseData );
                        }
                    }
                } )
                .catch( (error) => {
                    _thisSubscribe.setState({
                        isLoading: false
                    });

                    alert( "No connection!" );
                } );
            } else {
                alert( "Please enter your email!" );
            }
        }
    }

    render() {
        return(
        <View
            style={SubscribeStyles.container}
        >
            <View
                style={SubscribeStyles.headerContainer}
            >
                <Text
                    style={SubscribeStyles.header}
                >
                    Subscribe for innovation!
                </Text>
                <Image
                    source={require("../../assets/images/star.png")}
                    style={SubscribeStyles.icon}
                />
            </View>
            <View
                style={SubscribeStyles.subscribeContainer}
            >
                <TextInput
                    placeholder={"What is your email?"}
                    placeholderTextColor={"#2d3436"}
                    autoCorrect={true}
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    style={SubscribeStyles.subscribeForm}
                    onChangeText={(email) => this.emailChange( email )}
                />
                <TouchableHighlight
                    activeOpacity={1}
                    underlayColor="rgba(0, 0, 0, 0)"
                    onPress={this.subscribe}
                >
                    <View
                        style={[SubscribeStyles.subscribeButton, (_thisSubscribe.state.isLoading ? SubscribeStyles.subscribeButtonLoading : SubscribeStyles.subscribeButtonFree)]}
                    >
                        <Text
                            style={SubscribeStyles.subscribeButtonText}
                        >
                            Subscribe
                        </Text>
                    </View>
                </TouchableHighlight>
            </View>
            <View
                style={SubscribeStyles.tncContainer}
            >
                <Text
                    style={SubscribeStyles.tncText}
                >
                    By subscribing to Gero's you agree with our
                </Text>
                <TouchableHighlight
                    activeOpacity={1}
                    underlayColor="rgba(0, 0, 0, 0)"
                    onPress={() => this.props.navigation.navigate( "Privacy Policy", { title: "Be sure with Gero's!" } )}
                    style={SubscribeStyles.tncLinkContainer}
                >
                    <Text
                        style={SubscribeStyles.tncLink}
                    >
                        Privacy Policy
                    </Text>
                </TouchableHighlight>
            </View>
        </View>
        );
    }
}

export default Subscribe;