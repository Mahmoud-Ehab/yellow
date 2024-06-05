import { StyleSheet } from 'react-native';

export const getSliderFlexStyle = (slideValue: number, extend?: object) => StyleSheet.create({
    main: {
        ...extend,
        flex: slideValue,
    }
});
