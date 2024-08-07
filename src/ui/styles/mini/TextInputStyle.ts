import { StyleSheet } from "react-native";
import { colors } from "../colors";
import { isTabletDevice } from "../mediaQuery";
import { fonts } from "../fonts";

export const getTextInputStyle = () =>
  StyleSheet.create({
    main: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      width: "80%",
      height: isTabletDevice() ? "50%" : "25%",
      margin: isTabletDevice() ? "2.5%" : "5%",
      borderWidth: 2,
      borderColor: colors.primary,
      borderRadius: 20,
      backgroundColor: "transparent",
      color: colors.primary,
      overflow: "hidden",
    },
    label: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      width: "100%",
      padding: "2%",
      fontSize: isTabletDevice() ? 15 : 20,
      fontFamily: fonts.Jua,
      color: colors.darkPrimary,
      backgroundColor: colors.primary,
    },
    textinput: {
      flex: 2,
      justifyContent: "center",
      backgroundColor: "transparent",
      fontFamily: fonts.Jua,
    },
  });
