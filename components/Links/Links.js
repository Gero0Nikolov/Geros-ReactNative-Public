// Imports
import React, { Component } from 'react';

import {
    View,
    Text,
    TouchableHighlight,
    Linking,
    Image
} from 'react-native';

import MainStyles from '../../assets/styles/Main.js';
import LinksStyles from './Style.js';
import REST from '../../assets/scripts/REST.js';
import DEFAULTS from '../../assets/scripts/DEFAULTS.js';

var _linksData = {
    linkIDs: []
};

class Links extends Component {
    constructor() {
        super();

        this.state = {
            links: []
        };
    }

    async componentDidMount() {
        // Get Contacts
        this.getContacts();
    }

    getContacts() {
        fetch( 
            REST.url + REST.prepareArgs({
                action: "get_contacts"
            })
        )
        .then( (response) => response.json() )
        .then( (responseData) => {
            if ( responseData.length > 0 ) {
                let newIDs = [];
                for ( let count = 0; count < responseData.length; count++ ) {
                    newIDs.push( responseData[ count ].label );
                }

                if ( newIDs != _linksData.newIDs ) {
                    _linksData.newIDs = newIDs;

                    this.setState({
                        links: responseData
                    });
                }
            }
        } )
        .catch( (error) => {
            alert( "No connection! Reconnect and restart the app." );
        } );
    }

    render() {
        let linksContainer = [];
        if ( this.state.links.length > 0 ) {
            for ( let count = 0; count < this.state.links.length; count++ ) {
                let contact = this.state.links[ count ];

                let container = 
                <TouchableHighlight
                    key={"contact-"+ count}
                    activeOpacity={1}
                    underlayColor="rgba(0, 0, 0, 0)"
                    onPress={() => Linking.openURL( contact.url )}
                >
                    <View
                        style={LinksStyles.container}
                    >
                        <Image
                            style={LinksStyles.icon}
                            source={{uri: contact.icon}}
                        />
                        <Text
                            style={LinksStyles.link}
                        >
                            {contact.label}
                        </Text>
                    </View>
                </TouchableHighlight>
                ;

                linksContainer.push( container );
            }
        } else {
            linksContainer = 
            <View
                style={LinksStyles.container}
            >
                <Image
                    style={LinksStyles.icon}
                    source={DEFAULTS.links.loadingImage}
                />
                <Text
                    style={LinksStyles.link}
                >
                    {DEFAULTS.links.loadingText}
                </Text>
            </View>
            ;
        }

        return (
        <View
            style={MainStyles.view}
        >
            <View 
                style={MainStyles.row}
            >
                <Text
                    style={MainStyles.containerTitle}
                >
                    Find Gero at
                </Text>
            </View>
            {linksContainer}
        </View>
        );
    }
}

export default Links;