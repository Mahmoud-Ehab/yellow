import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { shadows } from './shadows';
import { isMobileDevice } from './mediaQuery';

export const getSplashScreenStyle = () => StyleSheet.create({
    main: {
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.primary,
        overflow: 'hidden'
    },

    container: {    
        height: "95%",
        width: "90%",
        flexDirection: "column",
        alignItems: 'center',
        borderTopEndRadius: 800,
        borderTopStartRadius: 800,
        borderBottomStartRadius: 1000,
        borderBottomEndRadius: 1000,
        backgroundColor: colors.secondary,
        transform: "@media (max-width: 480px) rotateX(-15deg) translateY(40px)",
        ...shadows.normal
    },

    containerTopPart: {
        flex: 3,
        flexDirection: isMobileDevice() ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        paddingLeft: isMobileDevice() ? 0 : 150,
        paddingRight: isMobileDevice() ? 0 : 150,
    },
    logo: {
        flex: isMobileDevice() ? 3 : 1,
        height: isMobileDevice() ? '150%' : '100%',
        width: isMobileDevice() ? '150%' : '100%',
    },
    form: {
        flex: isMobileDevice() ? 1 : 1.5,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
    },
    containerBotPart: {
        flex: 1,
        justifyContent: 'center',
        width: isMobileDevice() ? '80%' : '25%',
    },
});