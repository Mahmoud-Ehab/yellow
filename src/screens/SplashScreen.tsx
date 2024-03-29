import { View } from 'react-native';
import { Image } from 'expo-image';
import { getSplashScreenStyle } from '../styles/SplashScreenStyle';
import { Textarea } from '../mini-components/Textarea';

export function SplashScreen() {
    const style = getSplashScreenStyle();
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
                        <Textarea label='Your Nickname' style={style.textinput} />
                        <Textarea label='Ip Address' style={style.textinput} />
                    </View>
                </View>
                <View style={style.containerBotPart}>

                </View>
            </View>
        </View>
    );
}
