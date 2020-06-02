// Import
import { 
    StyleSheet
} from 'react-native';

// Screen Stack Styles
const ScreenStackStyles = StyleSheet.create({
    noConnectionSafeArea: {
        backgroundColor: "#000"
    },
    noConnectionView: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        backgroundColor: "#000",
        padding: 20
    },
    noConnectionText: {
        fontFamily: "OpenSans-Bold",
        fontSize: 32,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 20
    },
    noConnectionTextSmall: {
        fontFamily: "OpenSans-Regular",
        fontSize: 20,
        fontWeight: "normal",
        color: "#fff",
        textAlign: "center",
        marginBottom: 20
    }
});

export default ScreenStackStyles;