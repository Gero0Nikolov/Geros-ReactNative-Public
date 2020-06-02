import { 
    StyleSheet,
    Dimensions
} from 'react-native'

let deviceWidth = Dimensions.get('window').width - 40;
let bannerWidth = 64;
let titleContainerWidth = deviceWidth - bannerWidth - 10;

const SingleProjectStyles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    dateContainer: {
        borderTopWidth: 1,
        borderColor: "#111",
        marginTop: 2.5,
        paddingTop: 2.5,
        width: titleContainerWidth
    },
    date: {
        fontFamily: "Vidaloka-Regular",
        fontWeight: "normal",
        fontSize: 18,
        color: "#111"        
    },
    banner: {
        width: bannerWidth,
        height: bannerWidth,
        borderRadius: bannerWidth / 2,
        marginRight: 10
    },
    title: {
        fontFamily: "Vidaloka-Regular",
        fontWeight: "normal",
        fontSize: 26,
        color: "#111",
        width: titleContainerWidth
    },
    content: {
        marginTop: 10
    }
});

export default SingleProjectStyles;