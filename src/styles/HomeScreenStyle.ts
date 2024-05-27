import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { isMobileDevice } from './mediaQuery';

export const getHomeScreenStyle = () => StyleSheet.create({
	main: {
		flexDirection: 'row',
    	height: "100%",
    	width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.lightPrimary
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
				width: "80%",
			},
			userBoxTextContainer: {
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			},
				userBoxText: {
					fontSize: isMobileDevice() ? 15 : 20,
					color: colors.secondary
				},
		roomsList: { 
			height: "70%" 
		},
			roomRow: {},
				roomRowImg: {},
				roomRowText: {},
		
	
	rightPart: {
		flex: 6,
		height: "100%",
	},
 });
