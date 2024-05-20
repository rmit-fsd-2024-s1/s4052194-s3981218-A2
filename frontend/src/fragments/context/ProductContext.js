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
  const [products, setProducts] = useState([]);
  const [loading,setLoading] = useState(true);
  useEffect(() => {
    const fetchInitData = async () => {
      try {
        const products = await getAllProducts();
        setProducts(products);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchInitData();
    //fetch api product and store it in the products
  }, []);
  return <ProductContext.Provider value={{products,loading}}>{children}</ProductContext.Provider>;

};
const useProducts = () => {
  const context = useContext(ProductContext);
  return context;
};
export default useProducts;
