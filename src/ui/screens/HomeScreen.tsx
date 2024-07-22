import { useEffect, useState } from 'react';
import { 
	View, 
	Text, 
	ScrollView, 
	GestureResponderEvent 
} from 'react-native';

import { Image } from 'expo-image';
import { Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

import { getGlobal, newGlobal } from '../../inits/globals.init';
import { controller } from '../../inits/controller.init'

import { Textarea } from '../mini-components/Textarea';
import { RoomsListItem } from '../components/RoomsListItem';

import { getHomeScreenStyle } from '../styles/screens/HomeScreenStyle';
import { getTextInputStyle } from '../styles/mini/TextInputStyle2';

import { Slider } from '../../modules/Slider';
import { ChatFragment } from '../components/ChatFragment';
import { getSliderFlexStyle } from '../styles/features/sliderFlexStyle';
import { getRoomBtnStyle } from '../styles/mini/RoomBtnStyle';
import { notifier } from '../../inits/notifier.init';

const slider = new Slider(0.2, 3, 1);

type UserInfo = {
	username: string;
	ipaddr: string;
}

export function HomeScreen() {
	// {flex: number} of style.leftPart
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
      closeChatroom();
		else
			setSelectedUser(user);
	}

	const userBtnStyle = (ipaddr: string) => { 
		return getRoomBtnStyle(selectedUser.ipaddr === ipaddr, style.roomsListItem).main;
  }

	const [usersList, setUsersList] = useState([]);

	useEffect(() => {
		reloadContacts();
    newGlobal({
      name: "reloadContactsFunc",
      value: () => reloadContacts(),
      type: "function"
    })
    newGlobal({
      name: "closeChatFunc",
      value: () => closeChatroom(),
      type: "function"
    })
	}, [])

	const reloadContacts = () => {
    closeChatroom();
	  controller.getContacts(({ res, err }) => {
      if (err) {
        notifier.notify({text: "Something went wrong!", type: "error"})
        console.error(err)
        return
      }
      if (Array.isArray(res)) {
        setUsersList(res)
      }
      else {
        console.error("reloadContact: getContacts res must be an array.")
        notifier.notify({text: "Something went wrong!", type: "error"})
      }
    })	
	}

  const closeChatroom = () => {
    setSelectedUser({username: "", ipaddr: ""})
  }

	const addContact = (ipaddr: string) => {
		notifier.notify({
			text: `connecting ${ipaddr}...`,
			type: "warning"
		})

		fetch(`http://${ipaddr}:5000/`, { signal: AbortSignal.timeout(5000) })
		.then(res => res.json())
		.then(payload => {
      if (!payload.response.username || !payload.response.ipaddr) {
				throw Error(ipaddr + " is not a Yellow server!") 
      }

			notifier.notify({
				text: `Found ${payload.response.username} at ${payload.response.ipaddr}`,
				type: "success"
			})

      controller.addContact(
        payload.response.username,
        payload.response.ipaddr,
        ({ res, err }) => {
          if (err) {
            notifier.notify({ text: err, type: "error" })  
            return;
          }
					setUsersList(prev => [...prev, {...payload.response}])
					notifier.notify({
						text: `${payload.response.username} has been added in your contacts.`,
						type: "success"
					})
        }
      )
		})
		.catch(err => {
			notifier.notify({
				text: "couldn't reach " + ipaddr,
				type: "error"
			})
			console.error(err)
		})
	}

  const [imageURI, setImageURI] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0]
      setImageURI(asset.uri)
      controller.setImage(asset.uri, () => {})
    }
  }

    return (
        <View style={style.main}>
            <View style={sliderStyle.main}>
				<View style={style.userBox}>
					<Image 
						style={style.userBoxImg}
						source={imageURI ? { uri: imageURI } : 'http://localhost:5000/image'}
						contentFit="cover"
            onPointerDown={pickImage}
					/>
					<View style={style.userBoxTextContainer}>
						<Text style={{...style.userBoxText, fontSize: 24}}>{getGlobal("myUserInfo").name}</Text>
						<Text style={{...style.userBoxText, fontSize: 18}}>{getGlobal("myUserInfo").ip}</Text>	
					</View>
				</View>
				<ScrollView contentContainerStyle={style.roomsList} scrollEnabled={sliderValue > 1}>
					{usersList.map((user, i) => (
						<RoomsListItem 
							key={i}
							overrideStyle={userBtnStyle(user.ipaddr)}
							imgsrc={`http://${user.ipaddr}:5000/image`}
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
					source={"../../../assets/dividerScroll.svg"}
					contentFit="contain"
				/>
			</View>

			<View style={style.rightPart}>{
				selectedUser.ipaddr !== "" ? 
        <ChatFragment 
					username={selectedUser.username} 
					ipaddr={selectedUser.ipaddr}
				/> 
        :
				<>
					<Image 
						style={style.rightPartImg}
						source={"../../../assets/home.png"}
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
