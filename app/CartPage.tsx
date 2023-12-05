import { useRouter } from "expo-router";
import React, { useContext } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { AppHeader } from "../components/AppHeader";
import Card from "../components/CartProductCard";
import { GlobalAddressContext } from "../providers/AddressProvider";
import { GlobalProductsContext } from "../providers/ProductsProvider";

const CartPage = () => {
  const { cartProducts, removeProduct, getTotal } = useContext(
    GlobalProductsContext
  );
  const { itemsCount, total } = getTotal();
  const { address } = useContext(GlobalAddressContext);
  const router = useRouter();
  return (
    <>
      <ScrollView style={styles.container}>
        <AppHeader title={"CART"} onBack={router.back} />
        {cartProducts.map((product) => (
          <Card
            handleTrash={() => removeProduct(product.id)}
            key={product.id}
            product={product}
          />
        ))}
      </ScrollView>
      <View style={styles.bottomContainer}>
        <View style={styles.elevatedView}>
          <View style={styles.locationIcon}>
            <Text>📍</Text>
          </View>
          <View style={styles.addressView}>
            <Text style={styles.addressTitle}>Location</Text>
            <Text textBreakStrategy="highQuality" style={styles.addressText}>
              {address}
            </Text>
          </View>
        </View>
        <View style={styles.bottomView}>
          <Text style={styles.bottomText}>{itemsCount} Products</Text>
          <Text style={styles.bottomText}>
            <Text style={styles.boldText}>R$ {total.toFixed(2)}</Text>
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  elevatedView: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    elevation: 5,
    backgroundColor: "#fff",
    paddingVertical: 10,
    marginBottom: 20,
  },
  addressView: {
    marginLeft: 10,
    marginRight: 130,
  },
  addressTitle: {
    fontWeight: "bold",
  },
  addressText: {
    color: "gray",
  },
  bottomContainer: {
    backgroundColor: "#f0f0f0",
  },
  locationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  bottomView: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    elevation: 5,
  },
  bottomText: {
    fontSize: 18,
    color: "#333",
  },
  boldText: {
    fontWeight: "bold",
  },
});

export default CartPage;
