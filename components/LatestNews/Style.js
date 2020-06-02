import { 
    StyleSheet,
    Dimensions 
} from 'react-native';

let deviceWidthFull = Dimensions.get('window').width;
let deviceWidth = Dimensions.get('window').width - 40;
let postContainerWidth = deviceWidth - 20;

// Latest News Styles
const LatestNewsStyles = StyleSheet.create({
    postContainer: {
        marginLeft: 20,
        width: postContainerWidth,
        paddingLeft: 0
    },
    postContainerLast: {
        marginLeft: 20,
        marginRight: 20,
        width: postContainerWidth
    },
    postContainerBanner: {
        width: postContainerWidth,
        height: postContainerWidth / 1.5,
        borderRadius: 5
    },
    postContainerTitle: {
        fontFamily: "Vidaloka-Regular",
        fontSize: 20,
        fontWeight: "normal",
        marginTop: 10,
        color: "#111"
    }
});

export default LatestNewsStyles;