import { StyleSheet } from "react-native";
import { colors } from "../colors";
import { fonts } from "../fonts";
import { shadows } from "../shadows";

export const getTextInputStyle = (showLabel?: boolean) =>
  StyleSheet.create({
    main: {
      flex: 1,
      display: "flex",
      height: showLabel ? "auto" : 40,
      margin: 10,
      backgroundColor: "transparent",
      color: colors.primary,
      overflow: "hidden",
      ...shadows.normal,
      shadowOpacity: showLabel ? 0 : shadows.normal.shadowOpacity,
    },
    label: {
      display: showLabel ? "flex" : "none",
      fontFamily: fonts.Jua,
      color: colors.darkPrimary,
    },
    textinput: {
      height: 40,
      backgroundColor: colors.secondary,
      fontFamily: fonts.Jua,
    },
  });
