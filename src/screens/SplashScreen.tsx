import { useState } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { Image } from 'expo-image';
import { getSplashScreenStyle } from '../styles/screens/SplashScreenStyle';
import { Textarea } from '../mini-components/Textarea';
import { getTextInputStyle } from '../styles/mini/TextInputStyle';
import { newGlobal } from '../inits/globals.init';
import { NAV_VALUES, screensNavigator } from '../inits/screensNavigator.init';

export function SplashScreen() {
	const style = getSplashScreenStyle();
	const textinputStyle = getTextInputStyle();

	const [userName, setUserName] = useState("");
	const [userIp, setUserIp] = useState("");
	
	const getStartedHandler = () => {
		if (!userName || !userIp)
			return Error("You shall write username and user ip to get started.");

		newGlobal({
			name: "myUserInfo",
			value: {
				name: userName, 
				ip: userIp
			},
            type: "userinfo"
		});

        screensNavigator.navTo(NAV_VALUES.HOME);
	}
    
    return (
        <View style={style.main}>
            <View style={style.container}>
                <View style={style.containerTopPart}>
                    <Image
                        style={style.logo}
                        source={require('../../assets/logo.svg')}
                        contentFit="cover"
                        transition={1000}
                    />
                    <View style={style.form}>
                        <Textarea 
                            label='Your Nickname' 
                            style={textinputStyle} 
                            placeholder='Jack Smith' 
                            onChangeText={(value) => setUserName(value)}
                        />
                        <Textarea 
                            label='Ip Address' 
                            style={textinputStyle} 
                            placeholder='000.000.0.000' 
                            keyboardType='numeric'
                            onChangeText={(value) => setUserIp(value)}
                        />
                    </View>
                </View>
                <View style={style.containerBotPart}>
                    <Button 
                    style={style.buttonBody}
                    labelStyle={style.buttonLabel}
					onPress={getStartedHandler}>
                        Get Started
                    </Button>
                </View>
            </View>
        </View>
    );
}
