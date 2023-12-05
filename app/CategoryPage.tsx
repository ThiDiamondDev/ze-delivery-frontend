import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { AppHeader } from "../components/AppHeader";
import GoToCartButton from "../components/GoToCartButton";
import { ProductGrid } from "../components/ProductGrid";

type CategoryPageParams = {
  category: string;
};

export const CategoryPage = () => {
  const { category } = useLocalSearchParams<CategoryPageParams>();

  const router = useRouter();
  if (!category) {
    router.back();
    return null;
  }
  return (
    <View style={styles.container}>
      <AppHeader onBack={router.back} title={category} />
      <ProductGrid category={category} />

      <GoToCartButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
});

export default CategoryPage;
