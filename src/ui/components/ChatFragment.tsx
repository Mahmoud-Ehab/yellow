import { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { Image } from "expo-image";
import { List } from "react-native-paper";
import { io } from "socket.io-client"

import { Textarea } from "../mini-components/Textarea";

import { getTextInputStyle } from "../styles/mini/TextInputStyle2";
import { getChatFragmentStyle } from "../styles/components/ChatFragmentStyle";

import { controller } from "../../inits/controller.init"
import { notifier } from "../../inits/notifier.init"
import { getGlobal, newGlobal, updateGlobal } from "../../inits/globals.init"

export function ChatFragment({ username, ipaddr }) {
    const style = getChatFragmentStyle();
    const [msg, setMsg] = useState("");
    const [pulv, setPulv] = useState(false); // pulv: PopUp List Visibility
    const [connected, setConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    const [config, setConfig] = useState({});

    useEffect(() => {
      setConfig(getGlobal("config"))
    }, [])

    useEffect(() => {
      if (!config.protocol) {
        return
      }
      reconnect()
      controller.getMessages(ipaddr, ({ res, err }) => {
        if (!err) {
          setMessages(res as Array<object>)
        }
      })
    }, [config])

    const reconnect = async () => {
      notifier.notify({text: `Trying to reach ${ipaddr} in 10 seconds...`, type: "warning"});
      fetch(`${config.protocol}://${ipaddr}:${config.server_port}`, { signal: AbortSignal.timeout(10000) })
      .then(res => res.json())
      .then(payload => {
        if (!payload.response.ipaddr) {
          throw Error("not a Yellow server!");
        }
        establishSocketConn();
        notifier.notify({text: `${ipaddr} is listening.`, type: "success"});
      })
      .catch(err => {
        setConnected(false)
        notifier.notify({text: `couldn't reach ${ipaddr}`, type: "error"});
      })
    }

    const establishSocketConn = () => {
      if (connected) { 
        return; 
      }

      const socket = io(`${config.protocol}://${ipaddr}:${config.server_port}`)
      socket.on("listening", () => setConnected(true))
      socket.on("message", ({ msgs_texts }) => {
        const msgsArr = []
        for (let text of msgs_texts) {
          msgsArr.push({
            content: text,
            sender_ip: ipaddr
          })
        }
        setMessages(prev => [...msgsArr, ...prev])
      })
      socket.on("disconnect", () => setConnected(false))

      let func = getGlobal("closeSocketFunc") ? updateGlobal : newGlobal
      func({
        name: "closeSocketFunc",
        value: () => socket.disconnect(),
        type: "function"
      })
    }

    const sendHandler = () => {
      if (msg === "") {
        return
      }
      controller.addMessages(ipaddr, [msg], ({ res }) => {
        if (res === true) {
          setMessages(prev => [{
            content: msg,
            sender_ip: ipaddr
          }, ...prev]);
          setMsg("");
        }
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
                    source={`${connected ? 'connected' : 'disconnected'}.png`} 
                    contentFit="contain"
                    onPointerDown={reconnect}
                />
                <Text style={style.topBarText}>{ username }</Text>
                <Image 
                    style={style.threeDotsBtn} 
                    source={"threedots.png"} 
                    contentFit="contain"
                    onPointerDown={() => setPulv(!pulv)}
                    onTouchStart={() => setPulv(!pulv)}
                />
            </View>

            <View style={style.chatContainer} onPointerDown={() => setPulv(false)} onTouchStart={() => setPulv(false)}>
                <Image 
                    style={style.chatImg} 
                    source={"chatroom.png"} 
                    contentFit="contain"
                />
                <ScrollView style={{width: '100%', height: '100%'}} contentContainerStyle={style.msgsContainer}>
                  {messages.map((msg, i) => (
                    <Text key={i} style={msg.sender_ip === ipaddr ? style.userMsg : style.userMsg}>
                      {msg.content}
                    </Text>
                  ))}
                </ScrollView>
            </View>

            <View style={style.msgInputContainer}>
                <Textarea 
                    style={{...getTextInputStyle(), ...style.msgInput}} 
                    value={msg}
                    label={""} 
                    placeholder="Write your message..."
                    onChangeText={(val) => setMsg(val)}
                />
                <Image 
                    style={style.sendBtn} 
                    source={"send.png"} 
                    contentFit="contain"
                    onPointerDown={() => sendHandler()}
                /> 
            </View>
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
