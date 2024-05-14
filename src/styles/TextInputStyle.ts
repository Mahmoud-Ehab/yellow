import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { isMobileDevice } from './mediaQuery';
import { fonts } from './fonts';

export const getTextInputStyle = () => StyleSheet.create({
    main: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: isMobileDevice() ? '80%' : '50%',
        height: isMobileDevice() ? '50%' : '20%',
        margin: "5%",
        borderWidth: 2,
        borderColor: colors.primary,
        borderRadius: 20,
        backgroundColor: 'transparent',
        color: colors.primary,
        overflow: 'hidden',
    },
    label: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        width: '100%',
        padding: "2%",
        fontSize: isMobileDevice() ? 15 : 20,
        fontFamily: fonts.Jua,
        color: colors.darkPrimary,
        backgroundColor: colors.primary,

    },
    textinput: {
        flex: 2,
        justifyContent: 'center',
        backgroundColor: 'transparent',
        fontFamily: fonts.Jua,
    }
});