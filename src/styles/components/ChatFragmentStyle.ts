import { StyleSheet } from 'react-native';
import { colors } from '../colors';
import { fonts } from '../fonts';
import { isTabletDevice } from '../mediaQuery';
import { shadows } from '../shadows';

export const getChatFragmentStyle = () => StyleSheet.create({
    main: {
        height: '100%',
        width: '100%',
        padding : isTabletDevice() ? 0 : 25,
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 45,
    },
        conStatusBtn: {
            flex: 1,
            height: 45,
            cursor: 'pointer',
        },
        topBarText: {
            flex: 8,
            textAlign: 'center',
            fontFamily: fonts.Jua,
            fontSize: 25,
            color: colors.darkPrimary,
        },
        threeDotsBtn: {
            flex: 1,
            height: 45,
            cursor: 'pointer',
        },

    popUpView: {
        position: 'absolute',
        padding: 10,
        right: isTabletDevice() ? 0 : 40,
        top: isTabletDevice() ? 40 : 65,
        borderRadius: 15,
        backgroundColor: colors.secondary,
        ...shadows.normal
    },
        closeChatBtn: { 
            fontFamily: fonts.Jua,
            color: colors.darkPrimary,
        },
        deleteContactBtn: { 
            fontFamily: fonts.Jua,
            color: colors.red 
        },
    
    chatContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
        chatImg: {
            position: 'absolute',
            width: "50%",
            height: "50%"
        },
        msgsContainer: {
            height: "100%",
            width: '100%',
            padding: isTabletDevice() ? 0 : 20,
            justifyContent: 'flex-end',
        },
            userMsg: {
                alignSelf: 'flex-end',
                width: 'auto',
                maxWidth: '75%',
                padding: 20,
                margin: 10,
                borderRadius: 15,
                fontSize: isTabletDevice() ? 15 : 20,
                fontFamily: fonts.Jua,
                color: colors.secondary,
                backgroundColor: colors.primary,
            },
            friendMsg: {
                alignSelf: 'flex-start',
                width: 'auto',
                maxWidth: '75%',
                padding: 20,
                margin: 10,
                borderRadius: 15,
                fontSize: isTabletDevice() ? 15 : 20,
                fontFamily: fonts.Jua,
                color: colors.darkPrimary,
                backgroundColor: colors.secondary,
            },
    
    msgInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: "100%",
        padding : isTabletDevice() ? 0 : 25,
    },
        msgInput: {
            ...shadows.normal
        },
        sendBtn: {
            width: 50,
            height: 50,
            cursor: 'pointer'
        }
})