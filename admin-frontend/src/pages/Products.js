import React, { useState, useEffect } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct, markSpecialProduct, unmarkSpecialProduct } from '../data/repository';
import '../style/Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    product_name: '',
    product_price: '',
    product_image: '',
    product_stock: ''
  });
  const [editingProductId, setEditingProductId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleCreateProduct = async () => {
    const data = await createProduct(newProduct);
    setProducts([...products, data]);
    setNewProduct({
      product_name: '',
      product_price: '',
      product_image: '',
      product_stock: ''
    });
  };

  const handleUpdateProduct = async (product_id, updatedProduct) => {
    const data = await updateProduct(product_id, updatedProduct);
    setProducts(products.map(product => (product.product_id === product_id ? data : product)));
    setEditingProductId(null);
  };

  const handleDeleteProduct = async (product_id) => {
    await deleteProduct(product_id);
    setProducts(products.filter(product => product.product_id !== product_id));
  };

  const handleToggleSpecialProduct = async (product_id, is_special) => {
    const data = is_special ? await unmarkSpecialProduct(product_id) : await markSpecialProduct(product_id);
    setProducts(products.map(product => (product.product_id === product_id ? { ...product, is_special: data.is_special } : product)));
  };

  return (
    <div className="admin-container">
      <h2>Product Management</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Stock</th>
            <th>Special</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.product_id}>
              {editingProductId === product.product_id ? (
                <>
                  <td><input type="text" defaultValue={product.product_name} onChange={(e) => product.product_name = e.target.value} /></td>
                  <td><input type="number" defaultValue={product.product_price} onChange={(e) => product.product_price = parseFloat(e.target.value)} /></td>
                  <td><input type="text" defaultValue={product.product_image} onChange={(e) => product.product_image = e.target.value} /></td>
                  <td><input type="number" defaultValue={product.product_stock} onChange={(e) => product.product_stock = parseInt(e.target.value)} /></td>
                  <td>
                    <button onClick={() => handleToggleSpecialProduct(product.product_id, product.is_special)}>
                      {product.is_special ? 'Unmark Special': 'Mark Special'}
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleUpdateProduct(product.product_id, product)}>Save</button>
                    <button onClick={() => setEditingProductId(null)}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{product.product_name}</td>
                  <td>{product.product_price}</td>
                  <td>{product.product_image}</td>
                  <td>{product.product_stock}</td>
                  <td>
                    <button onClick={() => handleToggleSpecialProduct(product.product_id, product.is_special)}>
                      {product.is_special ? 'Unmark Special' : 'Mark Special'}
                    </button>
                  </td>
                  <td>
                    <button onClick={() => setEditingProductId(product.product_id)}>Edit</button>
                    <button onClick={() => handleDeleteProduct(product.product_id)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
          <tr>
            <td><input type="text" value={newProduct.product_name} onChange={(e) => setNewProduct({ ...newProduct, product_name: e.target.value })} placeholder="Product Name" /></td>
            <td><input type="number" value={newProduct.product_price} onChange={(e) => setNewProduct({ ...newProduct, product_price: parseFloat(e.target.value) })} placeholder="Product Price" /></td>
            <td><input type="text" value={newProduct.product_image} onChange={(e) => setNewProduct({ ...newProduct, product_image: e.target.value })} placeholder="Product Image" /></td>
            <td><input type="number" value={newProduct.product_stock} onChange={(e) => setNewProduct({ ...newProduct, product_stock: parseInt(e.target.value) })} placeholder="Product Stock" /></td>
            <td></td>
            <td>
              <button onClick={handleCreateProduct}>Add Product</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Products;
