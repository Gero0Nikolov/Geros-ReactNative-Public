// Import
import { 
    StyleSheet,
    Dimensions
} from 'react-native';

let iconWidth = 30;
let deviceWidth = Dimensions.get('window').width - 40;
let formWidth = deviceWidth - 110;

// Subscribe Styles
const SubscribeStyles = StyleSheet.create({
    container: {
        marginTop: 20,
        padding: 20,
        paddingBottom: 15,
        backgroundColor: "#111"
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    header: {
        fontFamily: "Vidaloka-Regular",
        fontSize: 26,
        fontWeight: "normal",
        color: "#fff"
    },
    icon: {
        width: iconWidth,
        height: iconWidth,
        marginLeft: 10,
    },
    subscribeContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10
    },
    subscribeForm: {
        fontFamily: "OpenSans-Regular",
        fontSize: 16,
        fontWeight: "normal",
        backgroundColor: "#fff",
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        borderTopLeftRadius: 100,
        borderBottomLeftRadius: 100,
        borderWidth: 1,
        borderColor: "#fff",
        width: formWidth,
        color: "#111"
    },
    subscribeButton: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        borderTopRightRadius: 100,
        borderBottomRightRadius: 100,
        borderWidth: 1
    },
    subscribeButtonLoading: {
        backgroundColor: "#7f8c8d",
        borderColor: "#7f8c8d"
    },
    subscribeButtonFree: {
        backgroundColor: "#27ae60",
        borderColor: "#27ae60"
    },
    subscribeButtonText: {
        fontFamily: "Vidaloka-Regular",
        fontSize: 18,
        fontWeight: "normal",
        color: "#fff"
    },
    tncContainer: {
        marginTop: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap"  
    },
    tncText: {
        fontFamily: "OpenSans-Regular",
        fontSize: 11,
        fontWeight: "normal",
        textAlign: "center",
        color: "#fff"
    },
    tncLink: {
        fontFamily: "OpenSans-Regular",
        fontSize: 11,
        fontWeight: "normal",
        textAlign: "center",
        textDecorationLine: "underline",
        color: "#3498db",
        padding: 5
    }
});

export default SubscribeStyles;