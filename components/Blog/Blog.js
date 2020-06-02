// Imports
import React, { Component } from 'react';

import {
    StatusBar,
    SafeAreaView,
    FlatList,
    View,
    Text,
    TouchableHighlight,
    Image
} from 'react-native';

import MainStyles from '../../assets/styles/Main.js';
import BlogStyles from './Style.js';
import NL from '../../assets/scripts/NotificationListeners.js';
import GLOBALS from '../../assets/scripts/GLOBALS.js';
import REST from '../../assets/scripts/REST.js';
import DEFAULTS from '../../assets/scripts/DEFAULTS.js';

var dataBlog = {
    stories: [],
    limit: 3,
    offset: 0,
    refreshing: false
};

var _this;

class Blog extends Component {
    constructor() {
        super();

        this.state = dataBlog;
        _this = this;
    }

    componentDidMount() {
        // Connect Notifications Listener
        NL.notificationListener( this );

        // Get Stories
        this.getStories();

        // Set Current Screen
        GLOBALS.currentScreen = "blog";
    }

    componentWillUnmount() {
        // Purge Notifications Listener
        NL.purgeNotificationListener( this );

        // Reset Current Screen
        GLOBALS.currentScreen = "home";        
    }

    handleNotification() {
        if (
            GLOBALS.postID > 0 &&
            GLOBALS.type == "articles" &&
            GLOBALS.currentScreen == "blog"
        ) {
            // Cache Post ID
            let postID = GLOBALS.postID;

            // Purge Globals
            GLOBALS.postID = 0;

            // Fetch Latest Stories
            this.refresh();

            // Navigate to the Post Page
            this.props.navigation.navigate( "Single Article", { title: "Enjoy the read!", post_id: postID } );
        } else if (
            GLOBALS.postID > 0 &&
            GLOBALS.type == "projects" &&
            GLOBALS.currentScreen == "blog"
        ) {
            // Cache Post ID
            let postID = GLOBALS.postID;

            // Purge Globals
            GLOBALS.postID = 0;

            // Navigate to the Project Page
            this.props.navigation.navigate( "Single Project", { title: "Feel the idea!", post_id: postID } );
        }
    }

    async getStories() {
        if ( !dataBlog.refreshing ) {
            dataBlog.refreshing = true;

            fetch( 
                REST.url + REST.prepareArgs({
                    action: "get_stories",
                    limit: dataBlog.limit,
                    offset: dataBlog.offset
                })
            )
            .then( (response) => response.json() )
            .then( (responseData) => {
                dataBlog.refreshing = false;

                if ( responseData != false && responseData.length > 0 ) {
                    dataBlog.stories = [...dataBlog.stories, ...responseData];
                    dataBlog.offset += responseData.length;                    

                    _this.setState({
                        stories: dataBlog.stories
                    });
                }
            } )
            .catch( (error) => {
                alert( "No connection! Reconnect and restart the app." );
            } );
        }
    }

    refresh() {
        dataBlog.stories = [];
        dataBlog.offset = 0;
        
        _this.getStories();
    }

    clear() {
        dataBlog.stories = [];
        dataBlog.offset = 0;

        _this.setState({
            stories: []
        });
    }

    render() {      
        // Get Params
        let params = this.props.route.params;

        // Set Page Title
        this.props.navigation.setOptions({
            title: params.title
        });

        // Set Default View before REST Answer
        let blog;

        if ( dataBlog.stories.length > 0 ) {
            blog = 
            <FlatList
                data={this.state.stories}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                    <TouchableHighlight
                        key={item.id}
                        activeOpacity={1}
                        underlayColor="rgba(0, 0, 0, 0)"
                        onPress={() => this.props.navigation.navigate( "Single Article", { title: "Enjoy the read!", post_id: item.id } )}
                        style={[MainStyles.view, BlogStyles.view]}
                    >
                        <View>
                            <Text
                                style={BlogStyles.date}
                            >
                                {item.date}
                            </Text>
                            <Image 
                                source={(item.banner !== false ? {uri: item.banner} : DEFAULTS.blog.loadingImage)} 
                                style={BlogStyles.banner}
                            />
                            <Text
                                style={BlogStyles.title}
                            >
                                {item.title}
                            </Text>
                            <Text
                                style={BlogStyles.content}
                            >
                                {item.content}
                            </Text>
                        </View>
                    </TouchableHighlight>
                )}
                keyExtractor={(item, index) => {return "post-"+ item.id}}
                onRefresh={this.refresh}
                onEndReached={this.getStories}
                onEndReachedThreshold={1}
                refreshing={dataBlog.refreshing}
            />
            ;
        } else {
            blog = 
            <View
                style={MainStyles.view}
            >
                <Text
                    style={BlogStyles.date}
                >
                    {DEFAULTS.blog.loadingDateText}
                </Text>
                <Image 
                    source={DEFAULTS.blog.loadingImage} 
                    style={BlogStyles.banner}
                />
                <Text
                    style={BlogStyles.title}
                >
                    {DEFAULTS.blog.loadingTitleText}
                </Text>
                <Text
                    style={BlogStyles.content}
                >
                    {DEFAULTS.blog.loadingContentText}
                </Text>
            </View>
            ;
        }
        
        return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView>
            {blog}
            </SafeAreaView>
        </>
        );
    }
}

export default Blog;