import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
interface Props {
  visible: boolean;
  color: string;
  size: number;
}
const LoadingCircleBar: React.FC<Props> = (props) => {
  const { visible, color, size } = props;
  return (
    <View style={styles.container}>
      {visible && <ActivityIndicator color={color} size={size} />}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default LoadingCircleBar;
