import { StyleSheet } from 'react-native';

let avatarWidth = 64;

// Styles
const Styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    image: {
        width: avatarWidth,
        height: avatarWidth,
        borderRadius: avatarWidth / 2,
        marginRight: 10
    },
    name: {
        fontFamily: "Vidaloka-Regular",
        fontWeight: "normal",
        fontSize: 26,
        color: "#111",
    },
    quoteContainer: {
        borderTopWidth: 1,
        borderColor: "#111",
        marginTop: 2.5,
        paddingTop: 2.5
    },
    quote: {
        fontFamily: "Vidaloka-Regular",
        fontWeight: "normal",
        fontSize: 18,
        color: "#111"        
    },
    introContainer: {
        marginTop: 20
    },
    introText: {
        fontFamily: "OpenSans-Regular",
        fontWeight: "normal",
        fontSize: 16,
        color: "#111"
    }
});

export default Styles;