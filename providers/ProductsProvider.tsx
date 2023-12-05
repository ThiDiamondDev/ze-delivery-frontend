import { createContext, useEffect, useState } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import CATEGORIES_QUERY from "../graphql/CategoriesQuery";
import PARTNER_QUERY from "../graphql/PartnerQuery";
import PRODUCTS_QUERY from "../graphql/ProductsQuery";
import Product from "../interfaces/Product";

import { useLazyQuery } from "@apollo/client";
import LoadingCircleBar from "../components/LoadingCircleBar";
import { Category } from "../interfaces/Category";
import ProductContext, {
  DefaultProductContext,
} from "../interfaces/ProductContext";

export const GlobalProductsContext = createContext<ProductContext>(
  DefaultProductContext
);
interface Props {
  children: React.ReactNode;
}

const PARTNER_VARIABLES = {
  variables: { pocSearchLat: "-23.632919", pocSearchLong: "-46.709453" },
};

const ImageUrl = (title: string, index: number) =>
  `https://source.unsplash.com/random/?${title}&sig=${index}&w=150&h=150`;

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();

  const [getPartner, partnerQuery] = useLazyQuery(
    PARTNER_QUERY,
    PARTNER_VARIABLES
  );
  const [getCategories, categoriesQuery] = useLazyQuery(CATEGORIES_QUERY, {});

  const [getProducts, productsQuery] = useLazyQuery(PRODUCTS_QUERY);
  useEffect(() => {
    getPartner();
    getCategories();
  }, []);
  useEffect(() => {
    if (categoriesQuery.data)
      setCategories(
        categoriesQuery.data["categories"].map(({ title }: Category) => title)
      );
  }, [categoriesQuery.data]);

  useEffect(() => {
    if (partnerQuery.data && partnerQuery.data["pocSearch"]) {
      const [partner] = partnerQuery.data["pocSearch"];

      getProducts({ variables: { pocId: partner.id } });
    }
  }, [partnerQuery.data, getProducts]);

  useEffect(() => {
    if (
      productsQuery.data &&
      productsQuery.data["poc"] &&
      productsQuery.data["poc"]["products"]
    ) {
      setProducts(
        productsQuery.data["poc"]["products"].map(
          (product: Product, index: number): Product => ({
            ...product,
            image: ImageUrl(encodeURIComponent(product.title), index),
          })
        )
      );
    }
  }, [productsQuery.data]);

  const addProduct = (product: Product, quantityToAdd: number) => {
    const index = cartProducts.findIndex((p) => p.id === product.id);
    if (index === -1) {
      setCartProducts([
        ...cartProducts,
        { ...product, quantity: quantityToAdd },
      ]);
    } else {
      const updatedProducts = [...cartProducts];

      if (updatedProducts[index].quantity + quantityToAdd <= 99) {
        updatedProducts[index].quantity += quantityToAdd;
        setCartProducts(updatedProducts);
      }
    }
  };
  const subtractProduct = (product: Product, quantityToAdd: number) => {
    const index = cartProducts.findIndex((p) => p.id === product.id);
    if (index === -1) {
      setCartProducts([
        ...cartProducts,
        { ...product, quantity: quantityToAdd },
      ]);
    } else {
      const updatedProducts = [...cartProducts];

      if (updatedProducts[index].quantity - quantityToAdd >= 1) {
        updatedProducts[index].quantity -= quantityToAdd;
        setCartProducts(updatedProducts);
      }
    }
  };
  const removeProduct = (id: string) => {
    setCartProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };
  const filterByCategory = (category: string) => {
    return products.filter((product) => product.category.title === category);
  };
  const getTotal = () => {
    let total = 0,
      itemsCount = 0;
    for (let product of cartProducts) {
      itemsCount += product.quantity;
      total += product.price * product.quantity;
    }
    return { itemsCount, total };
  };
  const isLoading =
    partnerQuery.loading || productsQuery.loading || categoriesQuery.loading;
  const containerStyle: StyleProp<ViewStyle> = {
    opacity: isLoading ? 0 : 1,
    height: "100%",
    width: "100%",
  };
  return (
    <GlobalProductsContext.Provider
      value={{
        products,
        categories,
        selectedProduct,
        cartProducts,
        addProduct,
        filterByCategory,
        getTotal,
        removeProduct,
        setSelectedProduct,
        subtractProduct,
      }}
    >
      {isLoading && (
        <LoadingCircleBar visible={isLoading} color="#FFC500" size={50} />
      )}

      <View style={containerStyle}>{children}</View>
    </GlobalProductsContext.Provider>
  );
};
