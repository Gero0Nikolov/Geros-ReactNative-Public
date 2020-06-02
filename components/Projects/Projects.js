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
import ProjectsStyles from './Style.js';
import NL from '../../assets/scripts/NotificationListeners.js';
import GLOBALS from '../../assets/scripts/GLOBALS.js';
import REST from '../../assets/scripts/REST.js';
import DEFAULTS from '../../assets/scripts/DEFAULTS.js';

var dataProjects = {
    projects: [],
    limit: 9,
    offset: 0,
    refreshing: false
};

var _thisProjects;

class Projects extends Component {
    constructor() {
        super();

        this.state = dataProjects;
        _thisProjects = this;
    }

    componentDidMount() {
        // Connect Notifications Listener
        NL.notificationListener( this );

        // Get Projects
        this.getProjects();

        // Set Current Screen
        GLOBALS.currentScreen = "projects";
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
            GLOBALS.type == "projects" &&
            GLOBALS.currentScreen == "projects"
        ) {
            // Cache Post ID
            let postID = GLOBALS.postID;

            // Purge Globals
            GLOBALS.postID = 0;

            // Fetch Latest Stories
            this.refresh();

            // Navigate to the Project Page
            this.props.navigation.navigate( "Single Project", { title: "Feel the idea!", post_id: postID } );
        } else if (
            GLOBALS.postID > 0 &&
            GLOBALS.type == "articles" &&
            GLOBALS.currentScreen == "projects"
        ) {
            // Cache Post ID
            let postID = GLOBALS.postID;

            // Purge Globals
            GLOBALS.postID = 0;

            // Navigate to the Post Page
            this.props.navigation.navigate( "Single Article", { title: "Enjoy the read!", post_id: postID } );
        }
    }

    async getProjects() {
        if ( !dataProjects.refreshing ) {
            dataProjects.refreshing = true;

            fetch( 
                REST.url + REST.prepareArgs({
                    action: "get_projects",
                    limit: dataProjects.limit,
                    offset: dataProjects.offset
                })
            )
            .then( (response) => response.json() )
            .then( (responseData) => {
                dataProjects.refreshing = false;
                
                if ( responseData != false && responseData.length > 0 ) {
                    dataProjects.projects = [...dataProjects.projects, ...responseData];
                    dataProjects.offset += responseData.length;                    

                    _thisProjects.setState({
                        projects: dataProjects.projects
                    });
                }
            } )
            .catch( (error) => {
                alert( "No connection! Reconnect and restart the app." );
            } );
        }
    }

    refresh() {
        dataProjects.projects = [];
        dataProjects.offset = 0;
        
        _thisProjects.getProjects();
    }

    render() {
        // Get Params
        let params = this.props.route.params;

        // Set Page Title
        this.props.navigation.setOptions({
            title: params.title
        });

        // Set Default View before REST Answer
        let projects;

        if ( dataProjects.projects.length > 0 ) {
            projects = 
            <FlatList
                data={this.state.projects}
                showsVerticalScrollIndicator={false}
                style={MainStyles.view}
                numColumns={2}
                renderItem={({item, index}) => (                        
                    <TouchableHighlight
                        key={item.id}
                        activeOpacity={1}
                        underlayColor="rgba(0, 0, 0, 0)"
                        onPress={() => this.props.navigation.navigate( "Single Project", { title: "Feel the idea!", post_id: item.id } )}
                        style={[
                            ProjectsStyles.projectContainer, 
                            ( (index + 1) % 2 > 0 ? ProjectsStyles.projectContainerLeft : ProjectsStyles.projectContainerRight )
                        ]}
                    >
                        <View>
                            <Image 
                                source={(item.banner != false ? {uri: item.banner} : DEFAULTS.projects.loadingImage)} 
                                style={ProjectsStyles.projectContainerBanner}
                            />
                            <Text
                                style={ProjectsStyles.projectContainerTitle}
                            >
                                {item.title}
                            </Text>
                        </View>
                    </TouchableHighlight>
                )}
                keyExtractor={(item, index) => {return "post-"+ item.id}}
                onRefresh={this.refresh}
                onEndReached={this.getProjects}
                onEndReachedThreshold={1}
                refreshing={dataProjects.refreshing}
            />
            ;
        } else {
            projects = 
            <View
                style={[MainStyles.view, ProjectsStyles.rowContainer]}
            >
                <View
                    style={ProjectsStyles.projectContainer}
                >
                    <Image 
                        source={DEFAULTS.projects.loadingImage}
                        style={ProjectsStyles.projectContainerBanner}
                    />
                    <Text
                        style={ProjectsStyles.projectContainerTitle}
                    >
                        {DEFAULTS.projects.loadingTitleText1}
                    </Text>
                </View>
                <View
                    style={ProjectsStyles.projectContainer}
                >
                    <Image 
                        source={DEFAULTS.projects.loadingImage}
                        style={ProjectsStyles.projectContainerBanner}
                    />
                    <Text
                        style={ProjectsStyles.projectContainerTitle}
                    >
                        {DEFAULTS.projects.loadingTitleText2}
                    </Text>
                </View>
            </View>
            ;
        }
        
        return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView>
            {projects}
            </SafeAreaView>
        </>
        );
    }
}

export default Projects;