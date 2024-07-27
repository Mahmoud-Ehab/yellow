import { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { Image } from "expo-image";
import { List } from "react-native-paper";

import { Textarea } from "../mini-components/Textarea";

import { getTextInputStyle } from "../styles/mini/TextInputStyle2";
import { getChatFragmentStyle } from "../styles/components/ChatFragmentStyle";

import { controller } from "../../inits/controller.init"
import { notifier } from "../../inits/notifier.init"
import { getGlobal, newGlobal, updateGlobal } from "../../inits/globals.init"

import { io } from "socket.io-client"

export function ChatFragment({ username, ipaddr }) {
    const style = getChatFragmentStyle();
    const [pulv, setPulv] = useState(false); // pulv: PopUp List Visibility
    const [connected, setConnected] = useState(false);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
      reconnect()
    }, [])

    useEffect(() => {
      if (!connected) { 
        if (socket) { 
          socket.disconnect()
          setSocket(null);
        }
        return; 
      }
      const socket_tmp = io(`http://${ipaddr}:5000`)
      setSocket(socket_tmp)

      let func = getGlobal("closeSocketFunc") ? updateGlobal : newGlobal
      func({
        name: "closeSocketFunc",
        value: () => socket_tmp.disconnect(),
        type: "function"
      })
    }, [connected])

    const reconnect = async () => {
      notifier.notify({text: `Trying to reach ${ipaddr} in 10 seconds...`, type: "warning"});
      fetch(`http://${ipaddr}:5000`, { signal: AbortSignal.timeout(10000) })
      .then(res => res.json())
      .then(payload => {
        if (!payload.response.ipaddr) {
          throw Error("not a Yellow server!");
        }
        setConnected(true);
        notifier.notify({text: `${ipaddr} is listening.`, type: "success"});
      })
      .catch(err => {
        setConnected(false)
        notifier.notify({text: `couldn't reach ${ipaddr}`, type: "error"});
      })
    }

    const closeChatHandler = () => {
      const closeChat = getGlobal("closeChatFunc");
      if (closeChat) { 
        closeChat();
      }
      else {
        notifier.notify({text: "Something went wrong!", type: "error"});
      }
    }

    const deleteContactHandler = () => {
      const reloadContacts = getGlobal("reloadContactsFunc");
      controller.rmvContact(ipaddr, ({ res, err }) => {
        if (err) {
          console.log(err)
          return notifier.notify({ text: err, type: 'error' })
        }
        if (res === true) {
          reloadContacts();
          notifier.notify({ 
            text: `${username} has been removed from contacts.`, 
            type: 'success' 
          })
        }
        else {
          notifier.notify({ 
            text: "Something went wrong!", 
            type: 'error' 
          })
        }
      })
    }

    return (
        <View style={style.main}>
            <View style={style.topBar}>
                <Image 
                    style={style.conStatusBtn} 
                    source={`../../../assets/${connected ? 'connected' : 'disconnected'}.png`} 
                    contentFit="contain"
                    onPointerDown={reconnect}
                />
                <Text style={style.topBarText}>{ username }</Text>
                <Image 
                    style={style.threeDotsBtn} 
                    source={"../../../assets/threedots.png"} 
                    contentFit="contain"
                    onPointerDown={() => setPulv(!pulv)}
                    onTouchStart={() => setPulv(!pulv)}
                />
            </View>

            <View style={style.chatContainer} onPointerDown={() => setPulv(false)} onTouchStart={() => setPulv(false)}>
                <Image 
                    style={style.chatImg} 
                    source={"../../../assets/chatroom.png"} 
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
                    source={"../../../assets/send.png"} 
                    contentFit="contain"
                /> </View>
            { pulv ?
            <List.Section style={style.popUpView}>
                <List.Item 
                    titleStyle={style.closeChatBtn}
                    title="Close Chat" 
                    left={() => <List.Icon icon="close" color={style.closeChatBtn.color} />} 
                    onPointerDown={() => closeChatHandler()}
                />
                <List.Item 
                    titleStyle={style.deleteContactBtn}
                    title="Delete Contact" 
                    left={() => <List.Icon icon="delete" color={style.deleteContactBtn.color} />} 
                    onPointerDown={() => deleteContactHandler()}
                />
            </List.Section> : <></>
            }
        </View>
    );
}
