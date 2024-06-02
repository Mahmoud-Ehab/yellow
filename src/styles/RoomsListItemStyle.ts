import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { fonts } from './fonts';
import { shadows } from './shadows';

export const getRoomsListItemStyle = () => StyleSheet.create({
    main: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginTop: 25,
        marginBottom: 25,
        backgroundColor: colors.secondary,
        cursor: "pointer",
        ...shadows.normal
    },
    img: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    textContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',  
    },
    text: {
        fontFamily: fonts.Jua,
        margin: 2,
        color: colors.darkPrimary,
    },
})