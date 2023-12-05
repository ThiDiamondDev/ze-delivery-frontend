import { SetStateAction } from "react";
import CartProduct from "./CartProduct";
import Product from "./Product";

export default interface ProductContext {
  products: Product[];
  cartProducts: CartProduct[];
  categories: string[];
  selectedProduct?: Product;
  setSelectedProduct: React.Dispatch<React.SetStateAction<Product | undefined>>;
  addProduct: (product: Product, quantityToAdd: number) => void;
  subtractProduct: (product: Product, quantityToAdd: number) => void;

  removeProduct: (id: string) => void;
  getTotal: () => { itemsCount: number; total: number };
  filterByCategory: (category: string) => Product[];
}

export const DefaultProductContext: ProductContext = {
  products: [],
  addProduct: () => {},
  subtractProduct: () => {},

  removeProduct: () => {},
  getTotal: () => ({ itemsCount: 0, total: 0 }),
  cartProducts: [],
  categories: [],
  setSelectedProduct: function (
    value: SetStateAction<Product | undefined>
  ): void {
    throw new Error("Function not implemented.");
  },
  filterByCategory: function (category: string): Product[] {
    throw new Error("Function not implemented.");
  },
};
