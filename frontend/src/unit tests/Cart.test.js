import React from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import { CartProvider } from "../fragments/context/CartContext";
import * as cartService from "../services/cartService";
import { useNavigate } from "react-router-dom";
import useCart from "../fragments/context/CartContext";
//More details in the readme file
// Mock the cartService module
jest.mock("../services/cartService", () => ({
  addCart: jest.fn(),
  getCartById: jest.fn(),
  removeOne: jest.fn(),
  updateCart: jest.fn(),
  clearCart: jest.fn(),
}));

// Mock the useNavigate hook
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("CartContext", () => {
  const mockNavigate = jest.fn();
  useNavigate.mockReturnValue(mockNavigate);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const wrapper = ({ children }) => (
    <CartProvider userId="1">{children}</CartProvider>
  );
  //test adding a product
  test("Adding a product to the cart", async () => {
    //product
    const product = { product_id: 1, product_name: "Apple", product_price: 10 };
    cartService.addCart.mockResolvedValue({});
    //test the use reducer
    const { result } = renderHook(() => useCart(), { wrapper });

    await act(async () => {
      await result.current.addToCart(product);
    });

    expect(cartService.addCart).toHaveBeenCalledWith(product);
    expect(result.current.state.products).toEqual([product]);
  });
  //test removing a product
  test("Removing a product from the cart", async () => {
    //product
    const product = { product_id: 1, product_name: "Apple", product_price: 10 };
    cartService.addCart.mockResolvedValue({});
    cartService.removeOne.mockResolvedValue({});

    //test the use reducer
    const { result } = renderHook(() => useCart(), { wrapper });

    await act(async () => {
      await result.current.addToCart(product);
    });

    await act(async () => {
      await result.current.removeFromCart(product);
    });
    expect(result.current.state.products).toEqual([]);
  });
  //test changing a quantity
  test("Changing a quantity in the cart", async () => {
    //product
    const product = {
      product_id: 1,
      product_name: "Apple",
      product_price: 10,
      quantity: 1,
    };
    cartService.addCart.mockResolvedValue({});
    cartService.updateCart.mockResolvedValue({});

    //test the use reducer
    const { result } = renderHook(() => useCart(), { wrapper });

    await act(async () => {
      await result.current.addToCart(product);
    });

    await act(async () => {
      await result.current.updateQuantity(product, "plus");
    });
    let final = product;
    final.quantity += 1;
    //check if the product quantity's added by 1
    expect(result.current.state.products).toEqual([final]);
  });
});
