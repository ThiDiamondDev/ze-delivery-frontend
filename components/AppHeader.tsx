import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const AppHeader = ({
  title: category,
  onBack,
}: {
  title: string;
  onBack?: () => void;
}) => {
  return (
    <View style={styles.header}>
      {onBack && (
        <TouchableOpacity style={styles.backArrow} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{category.toUpperCase()}</Text>
    </View>
  );
};

export const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#eee",
    height: 100,
    justifyContent: "center",
    alignContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    position: "absolute",
    bottom: 10,
    marginTop: 20,
  },

  backArrow: {
    position: "absolute",
    left: 10,
    bottom: 10,
  },
});
