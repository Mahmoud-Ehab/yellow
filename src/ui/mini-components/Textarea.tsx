import { Text, View, StyleSheet, KeyboardTypeOptions } from "react-native";
import { TextInput } from "react-native-paper";
import { colors } from "../styles/colors";
import { useEffect, useState } from "react";

type Props = {
  label: string;
  value?: string;
  style?: {
    main: object;
    label: object;
    textinput: object;
  };
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  onChangeText?: (value: string) => void;
};

export function Textarea(props: Props) {
  const style = getStyle(props.style);
  const [text, setText] = useState("");

  useEffect(() => {
    if (props.value) setText(props.value);
  }, [props.value]);

  const setTextHandle = (text: string) => {
    setText(text);
    if (props.onChangeText) props.onChangeText(text);
  };

  return (
    <View style={style.main}>
      <Text style={style.label}>{props.label}</Text>
      <TextInput
        value={text}
        style={style.textinput}
        underlineStyle={{ backgroundColor: "transparent" }}
        placeholder={props.placeholder}
        placeholderTextColor={colors.primary}
        onChangeText={(text) => setTextHandle(text)}
        textColor={colors.primary}
        keyboardType={props.keyboardType || "default"}
      />
    </View>
  );
}

const getStyle = (style?) =>
  StyleSheet.create({
    main: {
      ...style.main,
    },
    label: {
      ...style.label,
    },
    textinput: {
      ...style.textinput,
    },
  });
