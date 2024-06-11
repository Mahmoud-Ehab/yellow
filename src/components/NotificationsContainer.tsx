import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { getNotificationsStyle } from "../styles/components/NotificationsStyle";
import { Notifier, Notification } from "../modules/Notifier";

type Props = {
    notifier: Notifier
}

export function NotificationsContainer({ notifier }: Props) {
    const style = getNotificationsStyle()
    const [notifications, setNotifications] = useState(notifier.notifications);

    useEffect(() => {
        notifier.addOnChangeListener({
            name: "setNotifications",
            func: (notifier) => setNotifications(notifier.notifications)});
    }, [])

    return (
        <View style={style.container}>
            {notifications.map((noti: Notification, i) => 
                <View key={i} style={style[noti.type]}>
                    <Text style={style.text}>{noti.text}</Text>
                    <View style={style.border}></View>
                </View>
            )}
        </View>
    );
}
