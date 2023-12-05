import { AntDesign } from "@expo/vector-icons";
import React, { useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CartProduct from "../interfaces/CartProduct";
import { GlobalProductsContext } from "../providers/ProductsProvider";
import QuantityManager from "./QuantityManager";

const Card = ({
  product,
  handleTrash,
}: {
  product: CartProduct;
  handleTrash: () => void;
}) => {
  const { addProduct, subtractProduct } = useContext(GlobalProductsContext);
  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>
            {product.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </Text>
          <QuantityManager
            height={40}
            quantity={product.quantity}
            handleMinus={() => subtractProduct(product, 1)}
            handlePlus={() => addProduct(product, 1)}
          />
        </View>
        <TouchableOpacity style={styles.trashButton} onPress={handleTrash}>
          <AntDesign name="delete" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: 150,
    paddingRight: 10,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    overflow: "hidden",
  },
  image: {
    width: "30%",
    height: "100%",
  },
  info: {
    width: "60%",
    height: "100%",
    padding: 10,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    fontSize: 14,
    marginVertical: 10,
  },
  trashButton: {
    margin: 10,
    alignSelf: "flex-start",
  },
});
export default Card;
