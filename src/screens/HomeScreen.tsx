import { View, ScrollView } from 'react-native';

import { getHomeScreenStyle } from '../styles/HomeScreenStyle';

export function HomeScreen() {
    const style = getHomeScreenStyle();
    return (
        <View style={style.main}>
            <View style={style.leftPart}>
				<View style={style.userBox}>
				</View>
				<ScrollView style={style.roomsList}>
				</ScrollView>
			</View>

			<View style={style.rightPart}>
			</View>
        </View>
    );
}

