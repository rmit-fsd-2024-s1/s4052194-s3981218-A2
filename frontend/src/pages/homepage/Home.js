import { React, useEffect, useState } from "react";
import CarouselSection from "../../components/CarouselSection";
import ProductList from "../../components/ProductList";
import { getData } from "../../services/repository";
import useLocalStorage from "../../fragments/customHook/useLocalStorage";
import SectionHeader from "../../components/SectionHeader";
import Banner from "../../components/Banner";
import { useScrollToTop } from "../../fragments/customHook/useScrollToTop";
import useProducts from "../../fragments/context/ProductContext";
const Home = () => {
  const { products, loading } = useProducts();
  useScrollToTop();
  if (loading) {
    return <div>Loading...</div>;
  }
  const showMostPopular =
    products != null
      ? products.slice(0, 4)
      : ""; /*show the first 5 products from the list as the most popular products */

  return (
    <div>
      <div className="heading text-center mt-5 px-5">
        <h2>
          We're passionate about offering you the finest selection of organic
          goods.{" "}
        </h2>
        <p>
          Every product on our shelves is carefully curated to ensure that
          you're getting the best quality, flavor, and nutrition while
          supporting environmentally-friendly practices.
        </p>
      </div>
      <CarouselSection />
      <Banner text="Special products" linkto="/special" />
      <SectionHeader
        title="Most Popular Products..."
        link="/shop-online"
        subtitle="View all products"
      />
      <ProductList list={showMostPopular} />
    </div>
  );
};

export default Home;
