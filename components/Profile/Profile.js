// Imports
import React, { Component } from 'react';

import {
    View,
    Text,
    Image
} from 'react-native';

import Styles from '../../assets/styles/Main.js';
import profileStyles from './Style.js';
import REST from '../../assets/scripts/REST.js';
import DEFAULTS from '../../assets/scripts/DEFAULTS.js';

// Profile
class Profile extends Component {
    constructor() {
        super();

        this.state = {
            logo: "",
            name: "Gero Nikolov",
            quote: "Every motion is emotion"
        };
    }

    async componentDidMount() {
        fetch( 
            REST.url + REST.prepareArgs({
                action: "get_info"
            })
        )
        .then( (response) => response.json() )
        .then( (responseData) => {
            this.setState({
               logo: responseData.logo,
               name: responseData.name,
               quote: responseData.quote 
            });
        } );
    }

    // Render the Component
    render() {
        let logo = this.state.logo.length == 0 ? DEFAULTS.profile.loadingLogo : {uri: this.state.logo};

        return (
        <View style={Styles.view}>
            <View style={profileStyles.container}>
                <Image 
                    source={logo} 
                    style={profileStyles.image}
                />
                <View>
                    <Text
                        style={profileStyles.name}
                    >{this.state.name}</Text>
                    <View
                        style={profileStyles.quoteContainer}
                    >
                        <Text
                            style={profileStyles.quote}
                        >{this.state.quote}</Text>
                    </View>
                </View>
            </View>
        </View>
        );
    }
}

export default Profile;