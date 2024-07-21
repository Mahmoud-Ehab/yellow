import { View, Text } from 'react-native';
import { Image, ImageSource } from 'expo-image';
import { getRoomsListItemStyle } from '../styles/components/RoomsListItemStyle';

type Props = {
    imgsrc: string | number | ImageSource | ImageSource[] | string[],
    username: String,
    ipaddr: String,
    overrideStyle?: object
    onPress?: Function;
}

export function RoomsListItem({ imgsrc, username, ipaddr, overrideStyle, onPress }: Props) {
    const style = getRoomsListItemStyle();

    const onPressHandler = () => {
        if (onPress)
            onPress({username, ipaddr});
    }

    return (
        <View 
        style={{...style.main, ...overrideStyle}} 
        onTouchStart={onPressHandler} 
        onPointerDown={onPressHandler}>
            <Image 
                style={style.img}
                source={imgsrc}
                contentFit="contain"
                transition={250}
            />
            <View style={style.textContainer}>
                <Text style={{...style.text, fontSize: 20}}>{username}</Text>
                <Text style={{...style.text, fontSize: 15}}>{ipaddr}</Text>
            </View>
        </View>
    );
}
