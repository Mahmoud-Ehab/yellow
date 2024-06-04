import { StyleSheet } from 'react-native';
import { colors } from '../colors';
import { fonts } from '../fonts';
import { shadows } from '../shadows';

export const getTextInputStyle = () => StyleSheet.create({
    main: {
        flex: 1,
        display: 'flex',
        height: 40,
        margin: 10,
        backgroundColor: 'transparent',
        color: colors.primary,
        overflow: 'hidden',
        ...shadows.normal
    },
    label: {
        display: 'none'
    },
    textinput: {
        height: 40,
        backgroundColor: colors.secondary,
        fontFamily: fonts.Jua,
    }
});
