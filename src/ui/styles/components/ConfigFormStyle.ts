import { StyleSheet } from 'react-native';
import { colors } from "../colors"

export const getConfigFormStyle = () => StyleSheet.create({
  main: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    height: "auto",
    padding: 25,
    borderRadius: 45,
    backgroundColor: colors.lightPrimary,
    top: "50%", 
    right: "50%",
    transform: "translate(50%,-50%)",
  },
})
