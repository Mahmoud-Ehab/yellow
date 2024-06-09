import { View, Text, ScrollView } from "react-native";
import { Image } from "expo-image";

import { Textarea } from "../mini-components/Textarea";

import { getTextInputStyle } from "../styles/mini/TextInputStyle2";
import { getChatFragmentStyle } from "../styles/components/ChatFragmentStyle";

export function ChatFragment({ username, ipaddr }) {
    const style = getChatFragmentStyle();

    return (
        <View style={style.main}>
            <View style={style.topBar}>
                <Image 
                    style={style.conStatusBtn} 
                    source={require("../../assets/disconnected.png")} 
                    contentFit="contain"
                />
                <Text style={style.topBarText}>{ username }</Text>
                <Image 
                    style={style.threeDotsBtn} 
                    source={require("../../assets/threedots.png")} 
                    contentFit="contain"
                />
            </View>

            <View style={style.chatContainer}>
                <Image 
                    style={style.chatImg} 
                    source={require("../../assets/chatroom.png")} 
                    contentFit="contain"
                />
                <ScrollView style={{width: '100%', height: '100%'}} contentContainerStyle={style.msgsContainer}>
                    <Text style={style.userMsg}>Hi, how are you.</Text>
                    <Text style={style.friendMsg}>I'm fine. What about you?</Text>
                </ScrollView>
            </View>

            <View style={style.msgInputContainer}>
                <Textarea 
                    style={{...getTextInputStyle(), ...style.msgInput}} 
                    label={""} 
                    placeholder="Write your message..." 
                />
                <Image 
                    style={style.sendBtn} 
                    source={require("../../assets/send.png")} 
                    contentFit="contain"
                />
            </View>
        </View>
    );
}
