import { React, useState } from "react";
import { useEffect, useContext } from "react";
import { BrowserRouter as Link, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Home from "../homepage/Home";
import Header from "../../fragments/header/Header";
import Footer from "../../fragments/footer/Footer";
import Myprofile from "../myprofile/Myprofile";
import SpecialDeals from "../special-deals/Special-deals";
import Cart from "../cart/Cart";
import ShopOnline from "../product-page/ShopOnline";
import Signin from "../signup-signin/Signin";
import { SignUp } from "../signup-signin/Signup";
import ProductPage from "../product-page/ProductPage";
import Checkout from "../checkoutpage/Checkout";
import Thankyou from "../thankyoupage/Thankyou";
import { useScrollToTop } from "../../fragments/customHook/useScrollToTop";
import DietPlanPage from "../dietplan/DietPlanPage";
import DailyMealPlan from "../diet-daily/DailyMealPlan";
import ViewLastDailyMealPlan from "../diet-daily/ViewLastDailyMealPlan";
import WeeklyMealPlan from "../diet-weekly/WeeklyMealPlan";
import ViewLastWeeklyMealPlan from "../diet-weekly/ViewLastWeeklyPlan";
import { CartProvider } from "../../fragments/context/CartContext";
import { getCartById } from "../../services/cartService";
import { ProductsProvider } from "../../fragments/context/ProductContext";
import { getData } from "../../services/repository";
import { getUser, removeUser } from "../../services/repository";
import LoginLogout from "./LoginLogout";

const Main = () => {
  //fetch from local storage
  const { username, loginUser, logout, userId} = LoginLogout();
  return (
    <>
      {/* to pass user id to cart provider */}
        <ProductsProvider>
          <CartProvider userId={userId}>
            <Header username={username} logout={logout}/>
            {useScrollToTop()}
            <Routes>
              <Route path="/login" element={<Signin loginUser={loginUser} />} />
              <Route path="/Register" element={<SignUp loginUser={loginUser} />} />
              <Route path="/profile" element={<Myprofile />} />
              <Route path="/dietplanpage" element={<DietPlanPage />} />
              <Route path="/dailymealplan" element={<DailyMealPlan />} />
              <Route
                path="/viewLastDailyMealPlan"
                element={<ViewLastDailyMealPlan />}
              />
              <Route
                path="/viewLastWeeklyMealPlan"
                element={<ViewLastWeeklyMealPlan />}
              />
              <Route path="/weeklymealplan" element={<WeeklyMealPlan />} />
              <Route path="/" element={<Home />} />
              <Route path="/special" element={<SpecialDeals />} />
              <Route path="/shop-online" element={<ShopOnline />} />
              <Route path="/checkout" element={<Checkout/>} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/product-page/:urlId" element={<ProductPage />} />
              <Route path="/thankyou" element={<Thankyou />} />
            </Routes>
            <Footer />
          </CartProvider>
        </ProductsProvider>
    </>
  );
};

export default Main;
