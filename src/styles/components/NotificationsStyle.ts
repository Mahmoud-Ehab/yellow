import { StyleSheet } from 'react-native';
import { colors } from '../colors';
import { fonts } from '../fonts';
import { shadows } from '../shadows';
import { isTabletDevice } from '../mediaQuery';

export const getNotificationsStyle = () => StyleSheet.create({
    container: {
        position: 'absolute',
        right: 0,
        bottom: 20,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    success: {
        flexDirection: 'row',
        marginVertical: 10,
        borderTopStartRadius: 20,
        borderBottomStartRadius: 20,
        backgroundColor: colors.green,
        ...shadows.normal
    },
    warning: {
        flexDirection: 'row',
        marginVertical: 10,
        borderTopStartRadius: 20,
        borderBottomStartRadius: 20,
        backgroundColor: colors.gray,
        ...shadows.normal
    },
    error: {
        flexDirection: 'row',
        marginVertical: 10,
        borderTopStartRadius: 20,
        borderBottomStartRadius: 20,
        backgroundColor: colors.red,
        ...shadows.normal
    },

    text: {
        fontSize: isTabletDevice() ? 15 : 20,
        padding: 25,
        fontFamily: fonts.Jua,
        color: colors.secondary,
    },

    border: {
        width: 20,
        backgroundColor: colors.secondary,
        ...shadows.normal
    },
})