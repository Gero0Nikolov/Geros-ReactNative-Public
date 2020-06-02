// Imports
import React, { Component } from 'react';

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    Image,
    View,
    Text,
    Dimensions,
    Linking,
    Platform
} from 'react-native';

import MainStyles from '../../assets/styles/Main.js';
import HTMLStyles from '../../assets/styles/HTML.js';
import SingleArticleStyles from './Style.js';
import NL from '../../assets/scripts/NotificationListeners.js';
import GLOBALS from '../../assets/scripts/GLOBALS.js';
import REST from '../../assets/scripts/REST.js';
import DEFAULTS from '../../assets/scripts/DEFAULTS.js';
import HTML from 'react-native-render-html';

// Single Article
class SingleArticleScreen extends Component {
    constructor() {
        super();

        this.state = {
            banner: "",
            date: DEFAULTS.singleArticle.loadingDateText,
            title: DEFAULTS.singleArticle.loadingTitleText,
            content: DEFAULTS.singleArticle.loadingContentText
        };
    }

    componentDidMount() {
        // Connect Notifications Listener
        NL.notificationListener( this );

        // Fetch Post Info
        this.fetchPostInfo( this.props.route.params.post_id );

        // Set Current Screen
        GLOBALS.currentScreen = "single-article";
    }

    componentWillUnmount() {
        // Purge Notifications Listener
        NL.purgeNotificationListener( this );

        // Reset Current Screen to Home
        GLOBALS.currentScreen = "home";
    }

    handleNotification() {
        if (
            GLOBALS.postID > 0 &&
            GLOBALS.type == "articles" &&
            GLOBALS.currentScreen == "single-article"
        ) {
            // Cache Post ID
            let postID = GLOBALS.postID;

            // Purge Post ID from Globals in order not to mess the Latest News Handler
            GLOBALS.postID = 0;

            // Fetch the New Post Data
            this.fetchPostInfo( postID );
        } else if (
            GLOBALS.postID > 0 &&
            GLOBALS.type == "projects" &&
            GLOBALS.currentScreen == "single-article"
        ) {
            // Cache Post ID
            let postID = GLOBALS.postID;

            // Purge Post ID from Globals in order not to mess the Latest News Handler
            GLOBALS.postID = 0;

            // Navigate to the Project Page
            this.props.navigation.navigate( "Single Project", { title: "Feel the idea!", post_id: postID } );
        }
    }

    async fetchPostInfo( postID ) {
        fetch( 
            REST.url + REST.prepareArgs({
                action: "get_post_object",
                post_id: postID,
                platform: Platform.OS
            })
        )
        .then( (response) => response.json() )
        .then( (responseData) => {
            this.setState({
                banner: responseData.banner,
                date: responseData.date,
                title: responseData.title,
                content: responseData.content
            });
        } );
    }

    render() {
        // Get Params
        let params = this.props.route.params;

        // Set Page Title
        this.props.navigation.setOptions({
            title: params.title
        });

        // Set banner
        let banner = this.state.banner == false ? DEFAULTS.singleArticle.loadingImage : {uri: this.state.banner};

        return (
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
                            style={SingleArticleStyles.date}
                        >
                            {this.state.date}
                        </Text>
                        <Image
                            source={banner}
                            style={SingleArticleStyles.banner}
                        />
                        <Text
                            style={SingleArticleStyles.title}
                        >
                            {this.state.title}
                        </Text>
                        <View
                            style={SingleArticleStyles.content}
                        >
                            <HTML 
                                html={this.state.content} 
                                imagesMaxWidth={Dimensions.get('window').width - 40} 
                                tagsStyles={HTMLStyles}
                                onLinkPress={(evt, href) => Linking.openURL(href) }
                            />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
        );
    }
}

export default SingleArticleScreen;