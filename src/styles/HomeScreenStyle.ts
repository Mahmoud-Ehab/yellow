import { StyleSheet } from 'react-native';
import { colors } from './colors';

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
			backgroundColor: colors.darkPrimary
		},
			userBoxImg: {},
			userBoxText: {},
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
