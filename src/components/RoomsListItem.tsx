import { View, Text } from 'react-native';
import { Image, ImageSource } from 'expo-image';
import { getRoomsListItemStyle } from '../styles/RoomsListItemStyle';

type Props = {
    imgsrc: string | number | ImageSource | ImageSource[] | string[],
    username: String,
    ipaddr: String,
    overrideStyle?: object
}

export function RoomsListItem({ imgsrc, username, ipaddr, overrideStyle }: Props) {
    const style = getRoomsListItemStyle();
    return (
        <View style={{...style.main, ...overrideStyle}}>
            <Image 
                style={style.img}
                source={imgsrc}
                contentFit="contain"
                transition={250}
            />
            <View style={style.textContainer}>
                <Text style={{...style.text, fontSize: 22}}>{username}</Text>
                <Text style={{...style.text, fontSize: 14}}>{ipaddr}</Text>
            </View>
        </View>
    );
}