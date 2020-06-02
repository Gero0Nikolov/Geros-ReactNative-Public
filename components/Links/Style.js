// Import
import { 
    StyleSheet
} from 'react-native';

let iconWidth = 38;

// Solid Button Styles
const LinksStyles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        borderWidth: 2,
        borderColor: "#2d3436",
        borderRadius: 100,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 10
    },
    icon: {
        width: iconWidth,
        height: iconWidth,
        marginRight: 5,
        borderRadius: iconWidth / 2
    },
    link: {
        fontFamily: "Vidaloka-Regular",
        fontSize: 18,
        fontWeight: "normal",
        color: "#111",        
    }
});

export default LinksStyles;