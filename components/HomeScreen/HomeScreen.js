// Imports
import React, { Component } from 'react';

import {
    SafeAreaView,
    ScrollView,
    StatusBar
} from 'react-native';

import Profile from '../Profile/Profile.js';
import LatestNews from '../LatestNews/LatestNews.js';
import LatestProjects from '../LatestProjects/LatestProjects.js';
import Subscribe from '../Subscribe/Subscribe.js';
import Links from '../Links/Links.js';

// Home
class HomeScreen extends Component {
    constructor( props ) {
        super( props );
    }

    render() {
        return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <Profile />
                    <LatestNews navigation={this.props.navigation} />
                    <LatestProjects navigation={this.props.navigation} />
                    <Subscribe navigation={this.props.navigation} />
                    <Links navigation={this.props.navigation} />
                </ScrollView>
            </SafeAreaView>
        </>
        );
    }
}

export default HomeScreen;