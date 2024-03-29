import { Text, View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { colors } from '../styles/colors';
import { useState } from 'react';

type Props = {
    label: string;
    style?: object;
    placeholder?: string;
}

export function Textarea(props: Props) {
    const style = getStyle(props.style);
    const [text, setText] = useState("");

    return (
        <TextInput
            style={style.main}
            label={props.label}
            value={text}
            placeholder={props.placeholder}
            mode='outlined'
            onChangeText={text => setText(text)}
            textColor={colors.primary}
            outlineColor={colors.lightPrimary}
            activeOutlineColor={colors.primary}
            outlineStyle={{ borderWidth: 2 }}
        />
    );
}

const getStyle = (style?) => StyleSheet.create({
    main: {
        ...style
    },
})