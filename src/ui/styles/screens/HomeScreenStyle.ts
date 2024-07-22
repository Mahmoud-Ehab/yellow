import { StyleSheet } from 'react-native';
import { colors } from '../colors';
import { isTabletDevice } from '../mediaQuery';
import { fonts } from '../fonts';
import { shadows } from '../shadows';

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
			flex: isTabletDevice() ? 1 : 1, 
			flexDirection: 'column', 
			height: "100%", 
			width: isTabletDevice() ? '100%' : 'auto',
			backgroundColor: colors.primary,
			...shadows.normal
	},
		userBox: { 
			flexDirection: isTabletDevice() ? 'row' : 'column',
			height: isTabletDevice() ? 100 : '30%',
			justifyContent: "center",
			alignItems: "center", 
			paddingLeft: isTabletDevice() ? 25 : 0,
			paddingRight: isTabletDevice() ? 25 : 0,
			backgroundColor: colors.darkPrimary
		},
			userBoxImg: {
				flex: isTabletDevice() ? 1 : 2,
				width: "75%",
				height: isTabletDevice() ? '80%' : 'auto',
				margin: 5,
        borderRadius: 15
			},
			userBoxTextContainer: {
				flex: isTabletDevice() ? 3 : 1,
				justifyContent: "center",
				alignItems: "center",
			},
				userBoxText: {
					fontSize: 20,
					margin: 5,
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

	screenDivider: {
		display: isTabletDevice() ? "flex" : "none",
		justifyContent: 'center',
		alignItems: 'center',
		width: "100%",
		height: 20,
	},
		screenDividerImg: {
			width: 50,
			height: 50,
			transform: 'translateY(-10px)'
		},
	
	rightPart: {
		flex: isTabletDevice() ? 1 : 6,
		justifyContent: 'center',
		alignItems: 'center',
		height: "100%",
		width: isTabletDevice() ? '100%' : 'auto',
		padding: isTabletDevice() ? 15 : 0,
		overflow: 'hidden',
	},
		rightPartImg: {
			width: isTabletDevice() ? "100%" : "40%",
			height: isTabletDevice() ? 350 : "40%"
		},
		addFriendSection: {
			display: "flex",
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			width: isTabletDevice() ? "100%" : "auto",
		},
		addBtn: {
			backgroundColor: colors.primary
		},
		addBtnLabel: {
			color: colors.secondary
		}
 });
