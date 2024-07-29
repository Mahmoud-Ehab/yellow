import { StyleSheet } from "react-native";
import { colors } from "../colors";
import { shadows } from "../shadows";
import { isTabletDevice } from "../mediaQuery";

export const getGetStartedScreenStyle = () =>
  StyleSheet.create({
    main: {
      height: "100%",
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.primary,
      overflow: "hidden",
    },

    container: {
      height: "95%",
      width: "95%",
      flexDirection: "column",
      alignItems: "center",
      borderTopEndRadius: 800,
      borderTopStartRadius: 800,
      borderBottomStartRadius: 1000,
      borderBottomEndRadius: 1000,
      backgroundColor: colors.secondary,
      ...shadows.normal,
    },

    containerTopPart: {
      flex: 3,
      flexDirection: isTabletDevice() ? "column" : "row",
      justifyContent: "flex-start",
      alignItems: "center",
      width: "100%",
      paddingHorizontal: isTabletDevice() ? 0 : 30,
    },
    logo: {
      flex: isTabletDevice() ? 3 : 1,
      width: "100%",
      height: "100%",
    },
    form: {
      flex: isTabletDevice() ? 1 : 1,
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      paddingRight: isTabletDevice() ? 0 : "10%",
      height: "100%",
      width: "80%",
    },
    containerBotPart: {
      flex: isTabletDevice() ? 0.75 : 1,
      justifyContent: "center",
      width: isTabletDevice() ? "80%" : "25%",
    },
    buttonBody: {
      borderRadius: 50,
      borderBottomColor: colors.primary,
      borderBottomWidth: isTabletDevice() ? 0 : 3,
    },
    buttonLabel: {
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Jua-Regular",
      fontSize: isTabletDevice() ? 30 : 40,
      padding: isTabletDevice() ? 15 : "10%",
      color: colors.primary,
    },
  });
