// Import
import { 
    StyleSheet,
    Dimensions
} from 'react-native';

let deviceWidthFull = Dimensions.get('window').width;
let deviceWidth = Dimensions.get('window').width - 40;
let projectContainerWidth = ( deviceWidth / 2 ) - 10;

// Projects Styles
const ProjectsStyles = StyleSheet.create({
    rowContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        flexWrap: "wrap"
    },
    projectContainer: {
        margin: 0,
        marginBottom: 20,
        width: projectContainerWidth,
        paddingLeft: 0,
    },
    projectContainerLeft: {
        marginRight: 10
    },
    projectContainerRight: {
        marginLeft: 10
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

export default ProjectsStyles;