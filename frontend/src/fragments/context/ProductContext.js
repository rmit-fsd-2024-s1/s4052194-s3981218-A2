import {
  createContext,
  useReducer,
  useContext,
  useState,
  useEffect,
} from "react";
import { getAllProducts,getSpecialProducts } from "../../services/productService";
const ProductContext = createContext();

export const ProductsProvider = ({children}) => {
  const [products, setProducts] = useState([]);
  const [specialProducts, setSpecialProducts] = useState([]);
//load the products from the database
  const [loading,setLoading] = useState(true);
  useEffect(() => {
    const fetchInitData = async () => {
      try {
        const products = await getAllProducts();
        const specialProducts = await getSpecialProducts();
        setProducts(products);
        setSpecialProducts(specialProducts);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchInitData();
    //fetch api product and store it in the products
  }, []);
  return <ProductContext.Provider value={{products,specialProducts,loading}}>{children}</ProductContext.Provider>;

};
const useProducts = () => {
  const context = useContext(ProductContext);
  return context;
};
export default useProducts;
