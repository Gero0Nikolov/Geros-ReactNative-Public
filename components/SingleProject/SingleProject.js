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
import SingleProjectStyles from './Style.js';
import NL from '../../assets/scripts/NotificationListeners.js';
import GLOBALS from '../../assets/scripts/GLOBALS.js';
import REST from '../../assets/scripts/REST.js';
import DEFAULTS from '../../assets/scripts/DEFAULTS.js';
import HTML from 'react-native-render-html';

// Single Article
class SingleProjectScreen extends Component {
    constructor() {
        super();

        this.state = {
            banner: "",
            date: DEFAULTS.singleProject.loadingDateText,
            title: DEFAULTS.singleProject.loadingTitleText,
            content: DEFAULTS.singleProject.loadingContentText
        };
    }

    componentDidMount() {
        // Connect Notifications Listener
        NL.notificationListener( this );
        
        // Fetch Project Data
        this.fetchProjectInfo( this.props.route.params.post_id );

        // Set Current Screen
        GLOBALS.currentScreen = "single-project";
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
            GLOBALS.type == "projects" &&
            GLOBALS.currentScreen == "single-project"
        ) {
            // Cache Post ID
            let postID = GLOBALS.postID;

            // Purge Post ID from Globals in order not to mess the Latest News Handler
            GLOBALS.postID = 0;

            // Fetch the New Post Data
            this.fetchProjectInfo( postID );
        } else if (
            GLOBALS.postID > 0 &&
            GLOBALS.type == "articles" &&
            GLOBALS.currentScreen == "single-project"
        ) {
            // Cache Post ID
            let postID = GLOBALS.postID;

            // Purge Post ID from Globals in order not to mess the Latest News Handler
            GLOBALS.postID = 0;

            // Navigate to the Post Page
            this.props.navigation.navigate( "Single Article", { title: "Enjoy the read!", post_id: postID } );
        }
    }

    async fetchProjectInfo( postID ) {
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
        let banner = this.state.banner.length == 0 || this.state.banner == false ? DEFAULTS.singleArticle.loadingImage : {uri: this.state.banner};

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
                        <View
                            style={SingleProjectStyles.header}
                        >
                            <Image
                                source={banner}
                                style={SingleProjectStyles.banner}
                            />
                            <View
                                style={SingleProjectStyles.projectInfo}
                            >
                                <Text
                                    style={SingleProjectStyles.title}
                                >
                                    {this.state.title}
                                </Text>
                                <View
                                    style={SingleProjectStyles.dateContainer}
                                >
                                    <Text
                                        style={SingleProjectStyles.date}
                                    >
                                        Released on: {this.state.date}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View
                            style={SingleProjectStyles.content}
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

export default SingleProjectScreen;