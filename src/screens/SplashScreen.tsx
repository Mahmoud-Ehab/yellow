import { StyleSheet, View } from 'react-native';
import { colors } from '../styles/colors';
import { shadows } from '../styles/shadows';

export function SplashScreen() {
    const style = getStyle();
    return (
        <View style={style.main}>
            <View style={style.container}>
            </View>
        </View>
    );
}

const getStyle = () => StyleSheet.create({
    main: {
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.primary
    },
    container: {    
        height: "95%",
        width: "90%",
        borderTopEndRadius: 800,
        borderTopStartRadius: 800,
        borderBottomStartRadius: 1000,
        borderBottomEndRadius: 1000,
        backgroundColor: colors.secondary,
        transform: "@media (max-width: 480px) rotateX(-15deg) translateY(40px)",
        ...shadows.normal
    }
});