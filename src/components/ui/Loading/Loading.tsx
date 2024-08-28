import { ActivityIndicator, View } from "react-native";
import { styles } from './Loading.stylesheet';
import theme from "../../../core/config/theme";
export default function Loading() {

  return (
    <View
      style={{
        ...styles.main,
        ...styles.big
      }}
    >
      <ActivityIndicator color={theme.color} size={80} />
    </View>
  );
}