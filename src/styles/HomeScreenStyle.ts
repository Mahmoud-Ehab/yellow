import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { isMobileDevice, isTabletDevice } from './mediaQuery';
import { fonts } from './fonts';

export const getHomeScreenStyle = () => StyleSheet.create({
	main: {
		flexDirection: isTabletDevice() ? 'column' : 'row',
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
			width: isTabletDevice() ? '100%' : 'auto',
			backgroundColor: colors.primary 
	},
		userBox: { 
			flexDirection: isTabletDevice() ? 'row' : 'column',
			height: "30%",
			justifyContent: "center",
			alignItems: "center", 
			backgroundColor: colors.darkPrimary
		},
			userBoxImg: {
				flex: isTabletDevice() ? 1 : 2,
				margin: 5,
				width: "80%",
				height: isTabletDevice() ? '80%' : 'auto',
			},
			userBoxTextContainer: {
				flex: isTabletDevice() ? 2 : 1,
				justifyContent: "center",
				alignItems: "center",
			},
				userBoxText: {
					fontSize: 20,
					fontFamily: fonts.Jua,
					color: colors.secondary
				},
		roomsList: {
			flexDirection: isTabletDevice() ? 'row' : 'column',
			justifyContent: isTabletDevice() ? 'space-between' : 'flex-start',
			flexWrap: isTabletDevice() ? 'wrap' : 'nowrap',
			height: "auto",
			paddingTop: 10,
			paddingBottom: 10,
		},
			roomsListItem: {
				width: isTabletDevice() ? '45%' : 'auto'
			},
	
	rightPart: {
		flex: isTabletDevice() ? 1 : 6,
		justifyContent: 'center',
		alignItems: 'center',
		height: "100%",
		width: isTabletDevice() ? '100%' : 'auto',
		padding: isTabletDevice() ? 25 : 0,
	},
		rightPartImg: {
			width: isTabletDevice() ? "100%" : "40%",
			height: isTabletDevice() ? "70%" : "40%"
		},
		addFriendSection: {
			display: "flex",
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			width: isTabletDevice() ? "75%" : "auto"
		},
		addBtn: {
			backgroundColor: colors.primary
		},
		addBtnLabel: {
			color: colors.secondary
		}
 });
