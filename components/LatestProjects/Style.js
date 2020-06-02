// Import
import { 
    StyleSheet,
    Dimensions
} from 'react-native';

let deviceWidthFull = Dimensions.get('window').width;
let deviceWidth = Dimensions.get('window').width - 40;
let projectContainerWidth = ( deviceWidth / 1.85 ) - 20;

// Latest Projects Styles
const LatestProjectsStyles = StyleSheet.create({
    projectContainer: {
        marginLeft: 20,
        width: projectContainerWidth,
        paddingLeft: 0
    },
    projectContainerLast: {
        marginLeft: 20,
        marginRight: 20,
        width: projectContainerWidth
    },
    projectContainerBanner: {
        width: projectContainerWidth,
        height: projectContainerWidth,
        borderRadius: projectContainerWidth / 2
    },
    projectContainerTitle: {
        fontFamily: "Vidaloka-Regular",
        fontSize: 16,
        fontWeight: "normal",
        marginTop: 10,
        color: "#111",
        textAlign: "center",
        flexWrap: "wrap"
    }
});

export default LatestProjectsStyles;