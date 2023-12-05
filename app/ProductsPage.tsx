import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { AppHeader } from "../components/AppHeader";
import CategoryCards from "../components/CategoryCards";
import GoToCartButton from "../components/GoToCartButton";
import Panel from "../components/Panel";
import { ProductRow } from "../components/ProductRow";
import { GlobalProductsContext } from "../providers/ProductsProvider";

const ProductsPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();
  const { categories, setSelectedProduct } = useContext(GlobalProductsContext);
  return (
    <>
      <AppHeader onBack={() => router.replace("/")} title={"Products"} />

      <View style={styles.container}>
        <View style={styles.scrollContainer}>
          <ScrollView>
            <CategoryCards categories={categories} />
            {categories.map((category, index) => (
              <ProductRow
                onSelectProduct={(product) => {
                  setModalVisible(true);
                  setSelectedProduct(product);
                }}
                key={category + index}
                category={category}
              />
            ))}
          </ScrollView>
        </View>

        <GoToCartButton />
      </View>
      <Panel visible={modalVisible} onClose={() => setModalVisible(false)} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    flex: 1,
    width: "100%",
  },
});

export default ProductsPage;
