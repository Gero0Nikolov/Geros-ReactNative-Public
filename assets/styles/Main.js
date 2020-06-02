import { 
    StyleSheet,
    Dimensions 
} from 'react-native';

let deviceWidthFull = Dimensions.get('window').width;
let deviceWidth = Dimensions.get('window').width - 40;
let postContainerWidth = deviceWidth - 20;

// Main Styles
const MainStyles = StyleSheet.create({
    view: {
        paddingTop: 20,
        paddingBottom: 0,
        paddingLeft: 20,
        paddingRight: 20
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10
    },
    containerTitle: {
        fontFamily: "Vidaloka-Regular",
        fontSize: 26,
        fontWeight: "normal",
        color: "#111"
    }    
});

export default MainStyles;