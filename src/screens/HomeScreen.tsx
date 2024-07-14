import { useEffect, useState } from 'react';
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
import { notifier } from '../inits/notifier.init';

const slider = new Slider(0.2, 3, 1);

type UserInfo = {
	username: string;
	ipaddr: string;
}

export function HomeScreen() {
	// {flex: number} of the style.leftPart
	const [sliderValue, setSliderValue] = useState(slider.value);
	const [addContactText, setAddContactText] = useState("");

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

	const [usersList, setUsersList] = useState([]);

	useEffect(() => {
		reloadContacts();
	}, [])

	const reloadContacts = () => {
		fetch("http://localhost:5000/contacts")
		.then(res => res.json())
		.then(res => {
			setUsersList(res["response"])
		})
		.catch((err) => console.error(err))
	}

	const addContact = (ipaddr: string) => {
		notifier.notify({
			text: `connecting ${ipaddr}...`,
			type: "warning"
		})
		fetch(`http://${ipaddr}:5000/`, { signal: AbortSignal.timeout(5000) })
		.then(res => res.json())
		.then(payload => {
			if (!payload.response.username || !payload.response.ipaddr)
				throw Error(ipaddr + " is not a Yellow server!")
			notifier.notify({
				text: `Found ${payload.response.username} at ${payload.response.ipaddr}`,
				type: "success"
			})
			fetch("http://localhost:5000/contacts/add", {
				method: "POST",
				body: JSON.stringify(payload.response),
				headers: {
					"Content-Type": "application/json",
				}
			})
			.then((res) => {
				if (res.status === 200) {
					notifier.notify({
						text: `${payload.response.username} has been added in your contacts.`,
						type: "success"
					})
					setUsersList(prev => [...prev, {...payload.response}])
				}
				else if (res.status === 409) {
					notifier.notify({
						text: `${payload.response.username} is already in contacts.`,
						type: "success"
					})
				}
			})
			.catch((err) => {
				console.error(err)
				notifier.notify({
					text: "couldn't add " + payload.response.username + "for some reason.",
					type: "error"
				})
			})
		})
		.catch(err => {
			notifier.notify({
				text: "couldn't reach " + ipaddr,
				type: "error"
			})
			console.error(err)
		})
	}

    return (
        <View style={style.main}>
            <View style={sliderStyle.main}>
				<View style={style.userBox}>
					<Image 
						style={style.userBoxImg}
						source={require('../../assets/user.svg')}
						contentFit="contain"
					/>
					<View style={style.userBoxTextContainer}>
						<Text style={{...style.userBoxText, fontSize: 30}}>{getGlobal("myUserInfo").name}</Text>
						<Text style={{...style.userBoxText, fontSize: 15}}>{getGlobal("myUserInfo").ip}</Text>	
					</View>
				</View>
				<ScrollView contentContainerStyle={style.roomsList} scrollEnabled={sliderValue > 1}>
					{usersList.map((user, i) => (
						<RoomsListItem 
							key={i}
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
					/>
					<View style={style.addFriendSection}>
						<Textarea 
							label={""} 
							value={addContactText}
							onChangeText={(text) => setAddContactText(text)}
							style={textareaStyle}
							placeholder='Friend Ip Address' 
							keyboardType='numeric'
						/>
						<Button 
						style={style.addBtn}
						labelStyle={style.addBtnLabel}
						onPress={() => addContact(addContactText)}>
							Add
						</Button>
					</View>
				</>}
			</View>
        </View>
    );
}
