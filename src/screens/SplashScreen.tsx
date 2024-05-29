import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { Image } from 'expo-image';
import { getSplashScreenStyle } from '../styles/SplashScreenStyle';
import { Textarea } from '../mini-components/Textarea';
import { getTextInputStyle } from '../styles/TextInputStyle';
import { getGlobal } from '../inits/globals.init';

export function SplashScreen() {
    const style = getSplashScreenStyle();
    const textinputStyle = getTextInputStyle();
	
	const getStartedHandler = () => {
		getGlobal("nav").navToHome();
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
                        />
                        <Textarea 
                            label='Ip Address' 
                            style={textinputStyle} 
                            placeholder='000.000.0.000' 
                            keyboardType='numeric'
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
