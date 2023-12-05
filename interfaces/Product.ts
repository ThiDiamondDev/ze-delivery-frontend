import { Category } from "./Category";

export default interface Product {
  quantity: number;
  id?: any;
  title: string;
  image: string;
  price: number;
  category: Category;
}
