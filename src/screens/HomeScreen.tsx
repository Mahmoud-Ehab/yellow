import { View, Text, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { getHomeScreenStyle } from '../styles/screens/HomeScreenStyle';
import { getGlobal } from '../inits/globals.init';
import { RoomsListItem } from '../components/RoomsListItem';
import { Textarea } from '../mini-components/Textarea';
import { Button } from 'react-native-paper';
import { getTextInputStyle } from '../styles/mini/TextInputStyle2';

export function HomeScreen() {
    const style = getHomeScreenStyle();
	const textareaStyle = getTextInputStyle();

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
						<Text style={style.userBoxText}>{getGlobal("myUserInfo").name}</Text>
						<Text style={style.userBoxText}>{getGlobal("myUserInfo").ip}</Text>	
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
