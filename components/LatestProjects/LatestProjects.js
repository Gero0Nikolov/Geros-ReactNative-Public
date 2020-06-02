// Imports
import React, { Component } from 'react';

import {
    View,
    Text,
    Image,
    Button
} from 'react-native';

import MainStyles from '../../assets/styles/Main.js';
import LatestProjectsStyles from './Style.js';
import SolidButton from '../SolidButton/SolidButton.js';
import GLOBALS from '../../assets/scripts/GLOBALS.js';
import NL from '../../assets/scripts/NotificationListeners.js';
import REST from '../../assets/scripts/REST.js';
import DEFAULTS from '../../assets/scripts/DEFAULTS.js';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';

var _latestProjectsData = {
    newProjectsIDs: []
};

// Latest Projects
class LatestProjects extends Component {
    constructor() {
        super();

        this.state = {
            projects: []
        };
    }

    componentDidMount() {
        // Get Latest Projects
        this.getLatestProjects();

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
            GLOBALS.type == "projects" &&
            GLOBALS.currentScreen == "home"
        ) {
            // Cache Post ID
            let postID = GLOBALS.postID;

            // Purge Globals
            GLOBALS.postID = 0;
            GLOBALS.type = "";

            // Fetch Latest Projects
            this.getLatestProjects();

            // Navigate to the Project Page
            this.props.navigation.navigate( "Single Project", { title: "Feel the idea!", post_id: postID } );
        } else if (
            GLOBALS.postID == 0 &&
            GLOBALS.type == "projects" &&
            GLOBALS.currentScreen == "home"
        ) {
            // Purge Globals
            GLOBALS.type = "";

            // Fetch Latest Projects
            this.getLatestProjects();
        }
    }

    async getLatestProjects() {
        fetch( 
            REST.url + REST.prepareArgs({
                action: "get_latest_projects"
            })
        )
        .then( (response) => response.json() )
        .then( (responseData) => {
            if ( responseData.length > 0 ) {
                let newIDs = [];
                for ( let count = 0; count < responseData.length; count++ ) {
                    newIDs.push( responseData[ count ].id );
                }

                if ( newIDs != _latestProjectsData.newProjectsIDs ) {
                    _latestProjectsData.newProjectsIDs = newIDs;

                    this.setState({
                        projects: responseData
                    });
                }
            }
        } )
        .catch( (error) => {
            alert( "No connection! Reconnect and restart the app." );
        });
    }

    render() {
        // Build the Components
        let projectsContainer = [];
        if ( this.state.projects.length > 0 ) {
            for ( let count = 0; count < this.state.projects.length; count++ ) {
                let project = this.state.projects[ count ];
                
                let container = 
                <TouchableHighlight
                    key={project.id}
                    activeOpacity={1}
                    underlayColor="rgba(0, 0, 0, 0)"
                    onPress={() => this.props.navigation.navigate( "Single Project", { title: "Feel the idea!", post_id: project.id } )}
                    style={(count + 1 < this.state.projects.length ? LatestProjectsStyles.projectContainer : LatestProjectsStyles.projectContainerLast)}
                >   
                    <View>
                        <Image 
                            source={{uri: project.banner}} 
                            style={LatestProjectsStyles.projectContainerBanner}
                        />
                        <Text
                            style={LatestProjectsStyles.projectContainerTitle}
                        >
                            {project.title}
                        </Text>
                    </View>
                </TouchableHighlight>
                ;
                
                projectsContainer.push( container );
            }
        } else {
            projectsContainer = 
            <>
                <View
                    style={LatestProjectsStyles.projectContainer}
                >
                    <Image 
                        source={DEFAULTS.latestProjects.loadingImage} 
                        style={LatestProjectsStyles.projectContainerBanner}
                    />
                    <Text
                        style={LatestProjectsStyles.projectContainerTitle}
                    >
                        {DEFAULTS.latestProjects.loadingTitleText1}
                    </Text>
                </View>
                <View
                    style={LatestProjectsStyles.projectContainerLast}
                >
                    <Image 
                        source={DEFAULTS.latestProjects.loadingImage} 
                        style={LatestProjectsStyles.projectContainerBanner}
                    />
                    <Text
                        style={LatestProjectsStyles.projectContainerTitle}
                    >
                        {DEFAULTS.latestProjects.loadingTitleText2}
                    </Text>
                </View>   
            </>
            ;
        }

        // Render the Projects
        return (
        <View>
            <View
                style={[MainStyles.view, MainStyles.row]}
            >
                <Text 
                    style={MainStyles.containerTitle}
                >
                    Latest Projects
                </Text>
                <SolidButton 
                    text="Find all"
                    onPress={() => this.props.navigation.navigate( "Projects", { title: "Dig deeper!" } )}
                />
            </View>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
               {projectsContainer}
            </ScrollView>
        </View>
        );
    }
}

export default LatestProjects;