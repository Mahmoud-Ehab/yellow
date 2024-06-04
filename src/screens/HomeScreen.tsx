import { useState } from 'react';
import { View, Text, ScrollView, GestureResponderEvent } from 'react-native';
import { Image } from 'expo-image';
import { getHomeScreenStyle } from '../styles/screens/HomeScreenStyle';
import { getGlobal } from '../inits/globals.init';
import { RoomsListItem } from '../components/RoomsListItem';
import { Textarea } from '../mini-components/Textarea';
import { Button } from 'react-native-paper';
import { getTextInputStyle } from '../styles/mini/TextInputStyle2';
import { Slider } from '../modules/Slider';

const slider = new Slider(0.1, 3, 1);

export function HomeScreen() {
	// {flex: number} of the style.leftPart
	const [sliderValue, setSliderValue] = useState(slider.value);

    const style = getHomeScreenStyle({ sliderValue });
	const textareaStyle = getTextInputStyle();

	const onSliderStart = (e: GestureResponderEvent) => {
		slider.setInitValue(e.nativeEvent.pageY);
	}
	const onSliderMove = (e: GestureResponderEvent) => {
		slider.moveTo(e.nativeEvent.pageY, -1, 0.1);
		setSliderValue(slider.value)
	}

    return (
        <View style={style.main}>
            <View style={style.leftPart}>
				<View style={style.userBox}>
					<Image 
						style={style.userBoxImg}
						source={require('../../assets/user.svg')}
						contentFit="contain"
						transition={250}
					/>
					<View style={style.userBoxTextContainer}>
						<Text style={{...style.userBoxText, fontSize: 30}}>{getGlobal("myUserInfo").name}</Text>
						<Text style={{...style.userBoxText, fontSize: 15}}>{getGlobal("myUserInfo").ip}</Text>	
					</View>
				</View>
				<ScrollView contentContainerStyle={style.roomsList}>
					<RoomsListItem 
						overrideStyle={style.roomsListItem}
						imgsrc={require('../../assets/user.svg')} 
						username="User 1" 
						ipaddr="192.168.1.123" 
					/>
					<RoomsListItem 
						overrideStyle={style.roomsListItem}
						imgsrc={require('../../assets/user.svg')} 
						username="User 2" 
						ipaddr="192.168.1.321" 
					/>
					<RoomsListItem 
						overrideStyle={style.roomsListItem}
						imgsrc={require('../../assets/user.svg')} 
						username="User 3" 
						ipaddr="192.168.1.213" 
					/>
				</ScrollView>
				<View style={style.screenDivider} onTouchStart={onSliderStart} onTouchMove={onSliderMove}>
					<Image 
						style={style.screenDividerImg}
						source={require('../../assets/dividerScroll.svg')}
						contentFit="contain"
						transition={250}
					/>
				</View>
			</View>

			<View style={style.rightPart}>
				<Image 
					style={style.rightPartImg}
					source={require('../../assets/home.png')}
					contentFit="contain"
					transition={500}
				/>
				<View style={style.addFriendSection}>
					<Textarea 
						label={''} 
						style={textareaStyle}
						placeholder='Friend Ip Address' 
						keyboardType='numeric'
					/>
					<Button 
                    style={style.addBtn}
                    labelStyle={style.addBtnLabel}>
                        Add
                    </Button>
				</View>
			</View>
        </View>
    );
}
