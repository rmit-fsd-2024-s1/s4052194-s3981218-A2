import React from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import { CartProvider } from "../fragments/context/CartContext";
import { useNavigate } from "react-router-dom";
import * as reviewService from "../services/reviewService";
import useReview from "../fragments/customHook/useReview";
//More details in the readme file
// Mock the cartService module
jest.mock("../services/reviewService", () => ({
  addReview: jest.fn(),
  getReviewByProductId: jest.fn(),
  removeReview: jest.fn(),
  getAllReviews: jest.fn(),
  updateReview: jest.fn(),
  createReview: jest.fn(),
  createReply: jest.fn(),
}));

// Mock the useNavigate hook
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("review", () => {
  const mockNavigate = jest.fn();
  useNavigate.mockReturnValue(mockNavigate);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const wrapper = ({ children }) => (
    <CartProvider userId="1">{children}</CartProvider>
  );
  //test adding a review
  test("Adding a review", async () => {
    //review
    const review = { user_id: 1, product_id: 1, score: 2, comment: "ABC" };
    //api
    reviewService.addReview.mockResolvedValue(review);
    reviewService.getAllReviews.mockResolvedValue([review]);
    const { result } = renderHook(() => useReview(), { wrapper });
    //test the use reducer
    await act(async () => {
      await result.current.createReview(review, "noparent");
    });
    expect(reviewService.addReview).toHaveBeenCalledWith(review);
    expect(result.current.state.reviews).toEqual([review]);
  });
});
