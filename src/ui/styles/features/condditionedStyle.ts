import { StyleSheet } from "react-native";

export const getConditionedStyle = (
  condition: boolean,
  s1: object,
  s2: object,
  extend?: object,
) =>
  StyleSheet.create({
    main: condition ? { ...extend, ...s1 } : { ...extend, ...s2 },
  });
