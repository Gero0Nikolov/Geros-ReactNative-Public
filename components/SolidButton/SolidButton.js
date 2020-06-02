// Imports
import React from 'react';

import {
    View,
    Text,
    TouchableHighlight
} from 'react-native';

import SolidButtonStyles from './Style.js';

// Solid Button
function SolidButton( props ) {
    return (
    <TouchableHighlight
        activeOpacity={1}
        underlayColor="rgba(0, 0, 0, 0)"
        onPress={props.onPress}
    >
        <View
            style={SolidButtonStyles.view}
        >
            <Text
                style={[SolidButtonStyles.text, (typeof props.bigger !== "undefined" && props.bigger == true ? SolidButtonStyles.biggerText : SolidButtonStyles.text)]}
            >
                {props.text}
            </Text>
        </View>
    </TouchableHighlight>
    );
}

export default SolidButton;