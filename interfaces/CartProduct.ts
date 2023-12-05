import Product from "./Product";

export default interface CartProduct extends Product {
  quantity: number;
}
