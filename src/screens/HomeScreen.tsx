import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../styles/colors';

export function SplashScreen() {
    const style = getStyle();
    return (
        <View style={style.main}>
            <Text>Test</Text>
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
});