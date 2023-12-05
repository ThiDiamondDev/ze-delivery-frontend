import { AntDesign } from "@expo/vector-icons";
import React from "react";
import {
  DimensionValue,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type QuantityViewProps = {
  quantity: number;
  height: DimensionValue;
  handleMinus: () => void;
  handlePlus: (quantityToAdd: number) => void;
};

const QuantityManager = ({
  quantity,
  height,
  handleMinus,
  handlePlus,
}: QuantityViewProps) => {
  const minusColor = quantity === 1 ? "#f2f2f2" : "#FFC500";
  const plusColor = quantity === 99 ? "#f2f2f2" : "#FFC500";
  return (
    <View style={{ ...styles.roundedView, height }}>
      <TouchableOpacity onPress={handleMinus}>
        <AntDesign name="minus" size={30} color={minusColor} />
      </TouchableOpacity>
      <Text style={styles.quantity}>{quantity}</Text>
      <TouchableOpacity onPress={() => handlePlus(1)}>
        <AntDesign name="plus" size={30} color={plusColor} />
      </TouchableOpacity>
    </View>
  );
};

// export the component
export default QuantityManager;

// define some styles for the component
const styles = StyleSheet.create({
  roundedView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "gray",
    paddingHorizontal: 25,
    borderRadius: 20,
  },
  quantity: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
