import { 
    StyleSheet,
    Dimensions
} from 'react-native'

let deviceWidth = Dimensions.get('window').width - 40;

const SingleArticleStyles = StyleSheet.create({
    date: {
        fontFamily: "Vidaloka-Regular",
        fontSize: 20,
        fontWeight: "normal",
        color: "#111",
        marginBottom: 10
    },
    banner: {
        width: deviceWidth,
        height: deviceWidth / 1.5,
        borderRadius: 5
    },
    title: {
        fontFamily: "Vidaloka-Regular",
        fontSize: 26,
        fontWeight: "normal",
        color: "#111",
        marginTop: 10
    },
    content: {
        marginTop: 10
    }
});

export default SingleArticleStyles;