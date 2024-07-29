import "@expo/match-media";
import { useMediaQuery } from "react-responsive";

export const isMobileDevice = () => useMediaQuery({ maxWidth: 480 });
export const isTabletDevice = () => useMediaQuery({ maxWidth: 978 });
