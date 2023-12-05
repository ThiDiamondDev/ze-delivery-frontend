// import the necessary modules
import { router, useLocalSearchParams, useRouter } from "expo-router";
import { useContext, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Product from "../interfaces/Product";
import { GlobalProductsContext } from "../providers/ProductsProvider";
import Panel from "./Panel";
import { ProductCard } from "./ProductRow";

function isOdd(num: number): boolean {
  return num % 2 !== 0;
}
export const ProductGrid = ({ category }: { category: string }) => {
  const { selectedProduct, setSelectedProduct, filterByCategory } = useContext(
    GlobalProductsContext
  );

  const filteredProducts = filterByCategory(category);
  const isProductsOdd = isOdd(filteredProducts.length);
  const lastProduct = filteredProducts.at(-1);

  const [modalVisible, setModalVisible] = useState(false);
  const RenderProducts = () =>
    filteredProducts.map((product) => (
      <ProductCard
        cardWidth={"45%"}
        key={product.title}
        product={product}
        onAddButtonClick={() => {
          setSelectedProduct(product);
          setModalVisible(true);
        }}
      />
    ));

  const LastProductCard = () =>
    lastProduct && (
      <ProductCard
        cardWidth={"45%"}
        key={-1}
        product={lastProduct}
        invisible
        onAddButtonClick={() => {}}
      />
    );

  return (
    <>
      <ScrollView style={{ padding: 10 }}>
        <View style={styles.grid}>
          {RenderProducts()}
          {isProductsOdd && <LastProductCard />}
        </View>
      </ScrollView>

      {selectedProduct && (
        <Panel visible={modalVisible} onClose={() => setModalVisible(false)} />
      )}
    </>
  );
};

export const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  lastItemGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
});
