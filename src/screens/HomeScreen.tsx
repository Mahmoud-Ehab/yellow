import { View, Text, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { getHomeScreenStyle } from '../styles/HomeScreenStyle';

export function HomeScreen() {
    const style = getHomeScreenStyle();
    return (
        <View style={style.main}>
            <View style={style.leftPart}>
				<View style={style.userBox}>
					<Image 
						style={style.userBoxImg}
						source={require('../../assets/user.png')}
						contentFit="contain"
						transition={250}
					/>
					<View style={style.userBoxTextContainer}>
						<Text style={style.userBoxText}>Test</Text>
					</View>
				</View>
				<ScrollView style={style.roomsList}>
				</ScrollView>
			</View>

			<View style={style.rightPart}>
			</View>
        </View>
    );
}

