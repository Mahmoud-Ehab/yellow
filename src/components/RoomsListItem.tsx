import { View, Text, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { getRoomsListItemStyle } from '../styles/RoomsListItemStyle';

export function RoomsListItem({ imgsrc, username, ipaddr }) {
    const style = getRoomsListItemStyle();
    return (
        <View style={style.main}>
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