import { Platform } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

export default fonts = {
fontSmall: Platform.OS==='android'?  RFPercentage(1.8): RFPercentage(1.5),
fontMedium:  RFPercentage(1.8),
fontEntry:RFPercentage(2.0),
fontHeader:RFPercentage(2.1),
fontTV:RFPercentage(2.2),
fontNormal:RFPercentage(2.5),
fontLargeExtra:RFPercentage(2.7),
fontLarge:RFPercentage(3.0),
fontXLarge:RFPercentage(3.5),
fontXXLarge:RFPercentage(4.0),
fontXXLarge:RFPercentage(4.5),
};