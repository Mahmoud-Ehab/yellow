import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { Image } from 'expo-image';
import { getSplashScreenStyle } from '../styles/SplashScreenStyle';
import { Textarea } from '../mini-components/Textarea';
import { getTextInputStyle } from '../styles/TextInputStyle';
import { colors } from '../styles/colors';
import { isMobileDevice } from '../styles/mediaQuery';
import { shadows } from '../styles/shadows';

export function SplashScreen() {
    const style = getSplashScreenStyle();
    const textinputStyle = getTextInputStyle();
    
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
                        />
                    </View>
                </View>
                <View style={style.containerBotPart}>
                    <Button 
                    style={{
                        borderTopEndRadius: 800,
                        borderTopStartRadius: 800,
                        borderBottomStartRadius: 1000,
                        borderBottomEndRadius: 1000,
                        borderBottomColor: colors.primary,
                        borderBottomWidth: 3,
                        ...shadows.normal,
                    }}
                    labelStyle={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontFamily: 'Jua-Regular',
                        fontSize: isMobileDevice() ? 30 : 40,
                        padding: "10%",
                        color: colors.primary,
                        overflow: 'visible',
                    }}>
                        Get Started
                    </Button>
                </View>
            </View>
        </View>
    );
}
