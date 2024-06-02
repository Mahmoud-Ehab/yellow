import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { isMobileDevice } from './mediaQuery';
import { fonts } from './fonts';
import { shadows } from './shadows';

export const getHomeScreenStyle = () => StyleSheet.create({
	main: {
		flexDirection: 'row',
    	height: "100%",
    	width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.lightPrimary,
    },

	leftPart: { 
			flex: 1, 
			flexDirection: 'column', 
			height: "100%", 
			backgroundColor: colors.primary 
	},
		userBox: { 
			height: "30%",
			justifyContent: "center",
			alignItems: "center", 
			backgroundColor: colors.darkPrimary
		},
			userBoxImg: {
				flex: 2,
				margin: 5,
				width: "80%",
			},
			userBoxTextContainer: {
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			},
				userBoxText: {
					fontSize: isMobileDevice() ? 15 : 20,
					fontFamily: fonts.Jua,
					color: colors.secondary
				},
		roomsList: { 
			height: "70%" 
		},
	
	rightPart: {
		flex: 6,
		justifyContent: 'center',
		alignItems: 'center',
		height: "100%",
	},
		rightPartImg: {
			width: "40%",
			height: "40%"
		},
		addFriendSection: {
			display: "flex",
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
		},
		addBtn: {
			backgroundColor: colors.primary
		},
		addBtnLabel: {
			color: colors.secondary
		}
 });
