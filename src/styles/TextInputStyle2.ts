import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { fonts } from './fonts';
import { shadows } from './shadows';

export const getTextInputStyle = () => StyleSheet.create({
    main: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        height: 40,
        margin: 10,
        backgroundColor: 'transparent',
        color: colors.primary,
        overflow: 'hidden',
        ...shadows.normal
    },
    label: {},
    textinput: {
        flex: 2,
        justifyContent: 'center',
        backgroundColor: colors.secondary,
        fontFamily: fonts.Jua,
    }
});
