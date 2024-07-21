import { getConditionedStyle } from "../features/condditionedStyle";

export const getRoomBtnStyle = (condition: boolean, extend?: object) => getConditionedStyle(
    condition, {transform: "scale(0.8)"}, {}, extend
);