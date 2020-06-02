// Imports
import React, { Component } from 'react';

import {
    View,
    Text,
    Image
} from 'react-native';

import MainStyles from '../../assets/styles/Main.js';
import LatestNewsStyles from './Style.js';
import SolidButton from '../SolidButton/SolidButton.js';
import GLOBALS from '../../assets/scripts/GLOBALS.js';
import NL from '../../assets/scripts/NotificationListeners.js';
import REST from '../../assets/scripts/REST.js';
import DEFAULTS from '../../assets/scripts/DEFAULTS.js';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';

var _latestNewsData = {
    newsIDs: []
};

// Latest News
class LatestNews extends Component {
    constructor() {
        super();

        this.state = {
            news: []            
        };
    }

    componentDidMount() {
        // Get Latest Stories
        this.getLatestStories();

        // Set Notifications Listener
        NL.notificationListener( this );
    }

    componentWillUnmount() {
        // Purge Notifications Listener
        NL.purgeNotificationListener( this );
    }

    handleNotification() {
        if (
            GLOBALS.postID > 0 &&
            GLOBALS.type == "articles" &&
            GLOBALS.currentScreen == "home"
        ) {
            // Cache Post ID
            let postID = GLOBALS.postID;

            // Purge Globals
            GLOBALS.postID = 0;
            GLOBALS.type = "";

            // Fetch Latest Stories
            this.getLatestStories();

            // Navigate to the Post Page
            this.props.navigation.navigate( "Single Article", { title: "Enjoy the read!", post_id: postID } );
        } else if (
            GLOBALS.postID == 0 &&
            GLOBALS.type == "articles" &&
            GLOBALS.currentScreen == "home"
        ) {
            // Purge Globals
            GLOBALS.type = "";

            // Fetch Latest Stories
            this.getLatestStories();
        }
    }

    async getLatestStories() {
        fetch( 
            REST.url + REST.prepareArgs({
                action: "get_latest_stories"
            })
        )
        .then( (response) => response.json() )
        .then( (responseData) => {
            if ( responseData.length > 0 ) {
                let newIDs = [];
                for ( let count = 0; count < responseData.length; count++ ) {
                    newIDs.push( responseData.id );
                }

                if ( newIDs != _latestNewsData.newsIDs ) {
                    _latestNewsData.newsIDs = newIDs;

                    this.setState({
                        news: responseData
                    });
                }
            }
        } )
        .catch( (error) => {
            alert( "No connection! Reconnect and restart the app." );
        });
    }

    render() {
        // Build Stories Components
        let newsContainer = [];
        if ( this.state.news.length > 0 ) {
            for ( let count = 0; count < this.state.news.length; count++ ) {
                let post = this.state.news[ count ];

                let container = 
                <TouchableHighlight
                    key={post.id}
                    activeOpacity={1}
                    underlayColor="rgba(0, 0, 0, 0)"
                    onPress={() => this.props.navigation.navigate( "Single Article", { title: "Enjoy the read!", post_id: post.id } )}
                    style={(count + 1 < this.state.news.length ? LatestNewsStyles.postContainer : LatestNewsStyles.postContainerLast)}
                >   
                    <View>
                        <Image 
                            source={(post.banner.length > 0 ? {uri: post.banner} : DEFAULTS.latestStories.loadingStoryImage)} 
                            style={LatestNewsStyles.postContainerBanner}
                        />
                        <Text
                            style={LatestNewsStyles.postContainerTitle}
                        >
                            {post.title}
                        </Text>
                    </View>
                </TouchableHighlight>
                ;
                
                newsContainer.push( container );
            }
        } else {
            newsContainer = 
            <>
                <View
                    style={LatestNewsStyles.postContainer}
                >
                    <Image 
                        source={DEFAULTS.latestStories.loadingStoryImage} 
                        style={LatestNewsStyles.postContainerBanner}
                    />
                    <Text
                        style={LatestNewsStyles.postContainerTitle}
                    >
                        {DEFAULTS.latestStories.loadingStoryText1}
                    </Text>
                </View>
                <View
                    style={LatestNewsStyles.postContainerLast}
                >
                    <Image 
                        source={DEFAULTS.latestStories.loadingStoryImage} 
                        style={LatestNewsStyles.postContainerBanner}
                    />
                    <Text
                        style={LatestNewsStyles.postContainerTitle}
                    >
                        {DEFAULTS.latestStories.loadingStoryText2}
                    </Text>
                </View>
            </>
            ;
        }

        // Render the Components
        return (
        <View>
            <View
                style={[MainStyles.view, MainStyles.row]}
            >
                <Text 
                    style={MainStyles.containerTitle}
                >
                    Latest Stories
                </Text>
                <SolidButton 
                    text="Read all"
                    onPress={() => this.props.navigation.navigate( "Blog", { title: "Let's find something!" } )}
                />
            </View>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                {newsContainer}
            </ScrollView>
        </View>
        );
    }
}

export default LatestNews;