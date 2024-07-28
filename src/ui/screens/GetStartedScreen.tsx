import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { Image } from 'expo-image';

import { getGetStartedScreenStyle } from '../styles/screens/GetStartedScreenStyle';
import { Textarea } from '../mini-components/Textarea';
import { getTextInputStyle } from '../styles/mini/TextInputStyle';

import { newGlobal } from '../../inits/globals.init';
import { NAV_VALUES, screensNavigator } from '../../inits/screensNavigator.init';

import { controller } from '../../inits/controller.init'
import config from '../../../yellow.config.mjs'

export function GetStartedScreen() {
	const style = getGetStartedScreenStyle();
	const textinputStyle = getTextInputStyle();

	const [userName, setUserName] = useState("");
	const [userIp, setUserIp] = useState("");
  const [connected, setConnected] = useState(true);
  
  useEffect(() => {
    fetch(`${config.protocol}://${config.host_ip}:${config.server_port}/`)
    .then(res => res.json())
    .then(res => res.response)
    .then(payload => {
        setUserName(payload.username)
        setUserIp(payload.ipaddr)
        setConnected(true)
    })
    .catch(err => {
        setConnected(false);
        console.error(err);
    })
  }, [])
	
	const getStartedHandler = () => {
		if (!userName || !userIp)
			return Error("You shall write username and user ip to get started.");

    controller.setInfo(userName, userIp, ({ err }) => {
      if (err) {
        console.error(err)
        return;
      }
      newGlobal({
        name: "myUserInfo",
        value: {
          name: userName, 
          ip: userIp
        },
        type: "userinfo"
      });
      screensNavigator.navTo(NAV_VALUES.HOME);
    })
	}
    
    return (
        <View style={style.main}>
            <View style={style.container}>
                <View style={style.containerTopPart}>
                    <Image
                        style={style.logo}
                        source={'../../../assets/logo.svg'}
                        contentFit="cover"
                        transition={1000}
                    />
                    <View style={style.form}>
                        <Textarea 
                            value={userName}
                            label='Your Nickname' 
                            style={textinputStyle} 
                            placeholder='Jack Smith' 
                            onChangeText={(value) => setUserName(value)}
                        />
                        <Textarea 
                            value={userIp}
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
                    contentStyle={style.buttonBody}
                    labelStyle={style.buttonLabel}
                    onPress={getStartedHandler}
                    disabled={!connected}>
                        {connected ? "Get Started" : "Cannot reach the server!"}
                    </Button>
                </View>
            </View>
        </View>
    );
}
