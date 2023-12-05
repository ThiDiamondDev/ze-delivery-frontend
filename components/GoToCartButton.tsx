import { router } from "expo-router";
import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { GlobalProductsContext } from "../providers/ProductsProvider";

const GoToCartButton = () => {
  const { getTotal } = useContext(GlobalProductsContext);

  const { total, itemsCount } = getTotal();
  if (itemsCount === 0) return <></>;
  return (
    <TouchableOpacity
      style={{ ...styles.bottomView }}
      activeOpacity={0.4}
      onPress={() => router.push("/CartPage")}
    >
      <Text style={styles.bottomText}>{itemsCount} Products</Text>
      <Text style={styles.bottomText}>
        <Text style={styles.bottomText}>R$ {total.toFixed(2)}</Text>
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bottomView: {
    width: "100%",
    height: 70,
    backgroundColor: "#FFC500",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  bottomText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
});

export default GoToCartButton;
