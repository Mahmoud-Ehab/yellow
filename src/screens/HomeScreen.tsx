import { useState } from 'react';
import { 
	View, 
	Text, 
	ScrollView, 
	GestureResponderEvent 
} from 'react-native';

import { Image } from 'expo-image';
import { Button } from 'react-native-paper';


import { getGlobal } from '../inits/globals.init';

import { Textarea } from '../mini-components/Textarea';
import { RoomsListItem } from '../components/RoomsListItem';

import { getHomeScreenStyle } from '../styles/screens/HomeScreenStyle';
import { getTextInputStyle } from '../styles/mini/TextInputStyle2';

import { Slider } from '../modules/Slider';
import { ChatFragment } from '../components/ChatFragment';
import { getSliderFlexStyle } from '../styles/features/sliderFlexStyle';
import { getRoomBtnStyle } from '../styles/mini/RoomBtnStyle';

const slider = new Slider(0.2, 3, 1);

type UserInfo = {
	username: string;
	ipaddr: string;
	imgsrc: string;
}

export function HomeScreen() {
	// {flex: number} of the style.leftPart
	const [sliderValue, setSliderValue] = useState(slider.value);
    const style = getHomeScreenStyle();
	const sliderStyle = getSliderFlexStyle(sliderValue, style.leftPart);
	const textareaStyle = getTextInputStyle();

	const onSliderStart = (e: GestureResponderEvent) => {
		slider.setInitValue(e.nativeEvent.pageY);
	}
	const onSliderMove = (e: GestureResponderEvent) => {
		slider.moveTo(e.nativeEvent.pageY, -1);
		setSliderValue(slider.value)
	}

	const [selectedUser, setSelectedUser] = useState({username: "", ipaddr: ""});
	const onOpenChat = (user: UserInfo) => {
		if (user.ipaddr === selectedUser.ipaddr)
			setSelectedUser({username: "", ipaddr: ""});
		else
			setSelectedUser(user);
	}

	const userBtnStyle = (ipaddr: string) => 
		getRoomBtnStyle(selectedUser.ipaddr === ipaddr, style.roomsListItem).main;

	const [usersList, setUsersList] = useState([
		{
			username: "User 1",
			ipaddr: "102.123.1.123",
			imgsrc: "../../assets/user.svg"
		},
		{
			username: "User 2",
			ipaddr: "102.123.1.321",
			imgsrc: "../../assets/user.svg"
		},
		{
			username: "User 3",
			ipaddr: "102.123.1.231",
			imgsrc: "../../assets/user.svg"
		}
	]);

    return (
        <View style={style.main}>
            <View style={sliderStyle.main}>
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
				<ScrollView contentContainerStyle={style.roomsList} scrollEnabled={sliderValue > 1}>
					{usersList.map((user) => (
						<RoomsListItem 
							overrideStyle={userBtnStyle(user.ipaddr)}
							imgsrc={require("../../assets/user.svg")} 
							username={user.username} 
							ipaddr={user.ipaddr} 
							onPress={onOpenChat}
						/>
					))}
				</ScrollView>
			</View>

			<View style={style.screenDivider} onTouchStart={onSliderStart} onTouchMove={onSliderMove}>
				<Image 
					style={style.screenDividerImg}
					source={require('../../assets/dividerScroll.svg')}
					contentFit="contain"
					transition={250}
				/>
			</View>

			<View style={style.rightPart}>{
				selectedUser.ipaddr ? <ChatFragment 
					username={selectedUser.username} 
					ipaddr={selectedUser.ipaddr}
				/> :
				<>
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
				</>}
			</View>
        </View>
    );
}
