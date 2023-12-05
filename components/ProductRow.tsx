import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useContext } from "react";
import {
  DimensionValue,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Product from "../interfaces/Product";
import { GlobalProductsContext } from "../providers/ProductsProvider";

export const ProductCard = ({
  product,
  cardWidth,
  invisible,
  onAddButtonClick,
}: {
  product: Product;
  cardWidth?: DimensionValue;
  invisible?: boolean;
  onAddButtonClick: () => void;
}) => {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  const visibilityStyle = invisible ? styles.invisible : {};
  return (
    <View style={{ ...styles.card, ...visibilityStyle, width: cardWidth }}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: product.image }} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.price}>{formatter.format(product.price)}</Text>
        <Text style={styles.title}>{product.title}</Text>
      </View>
      <View style={styles.addButtonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onAddButtonClick()}
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const ProductRow = ({
  category,
  onSelectProduct,
}: {
  category: string;
  onSelectProduct: (product: Product) => void;
}) => {
  const { filterByCategory } = useContext(GlobalProductsContext);

  const filteredProducts = filterByCategory(category);

  const router = useRouter();

  const limitedProducts = filteredProducts.slice(0, 7);

  const goToProductsPage = (category: string) => {
    router.push({
      pathname: "/CategoryPage",
      params: {
        category,
      },
    });
  };
  if (filteredProducts.length === 0) return <></>;

  return (
    <View style={styles.rowContainer}>
      <View style={styles.categoryContainer}>
        <Text style={styles.category}>{category}</Text>
        <TouchableOpacity onPress={() => goToProductsPage(category)}>
          <Text style={styles.link}>
            See all <Text style={styles.arrow}>{">"}</Text>
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
        <View style={styles.row}>
          {limitedProducts.map((product) => (
            <ProductCard
              cardWidth={200}
              key={product.title}
              product={product}
              onAddButtonClick={() => onSelectProduct(product)}
            />
          ))}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => goToProductsPage(category)}
              style={styles.buttonWrapper}
            >
              <View style={styles.arrowButton}>
                <AntDesign name="right" size={24} color="#FFC500" />
              </View>
              <Text style={styles.buttonLabel}>See all</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    marginRight: 3,
    width: 150,
    height: 300,
    margin: 10,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    overflow: "hidden",
    marginBottom: 20,
  },

  imageContainer: {
    width: "100%",
    height: "50%",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  textContainer: {
    width: "100%",
    height: "30%",
    padding: 10,
    alignItems: "flex-start",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginVertical: 5,
  },
  addButtonContainer: {
    width: "100%",
    height: "25%",
    padding: 10,
    alignItems: "flex-end",
    marginTop: 5,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#444444",
  },
  button: {
    width: "100%",
    height: "75%",
    backgroundColor: "#FFC500",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: -10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  arrowButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0,
    shadowRadius: 4,
  },
  arrow: {
    width: 30,
    height: 30,
    backgroundColor: "#fff",
    color: "#444444",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  seeAll: {
    fontSize: 14,
    color: "#aaa",
  },
  rowContainer: {
    flexDirection: "column",
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 5,
    marginHorizontal: 20,
  },
  category: {
    fontSize: 24,
    fontWeight: "bold",
  },
  link: {
    fontSize: 14,
    fontWeight: "bold",
    textDecorationLine: "underline",
    color: "#444444",
  },
  row: {
    flexDirection: "row",
    marginLeft: 10,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  buttonWrapper: {
    alignItems: "center",
  },
  buttonLabel: {
    fontSize: 14,
    marginTop: 5,
  },
  invisible: { opacity: 0, pointerEvents: "none" },
});
