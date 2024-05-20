import {
  createContext,
  useReducer,
  useContext,
  useState,
  useEffect,
} from "react";
import { getAllProducts } from "../../services/productService";
const ProductContext = createContext();

export const ProductsProvider = ({children}) => {
  const [products, setProducts] = useState();
  useEffect(() => {
    const fetchInitData = async () => {
      try {
        const products = await getAllProducts();
        setProducts(products);
      } catch (err) {
        console.log(err);
      }
    };
    fetchInitData();
    //fetch api product and store it in the products
  }, []);
  return <ProductContext.Provider value={products}>{children}</ProductContext.Provider>;

};
const useProducts = () => {
  const context = useContext(ProductContext);
  return context;
};
export default useProducts;
