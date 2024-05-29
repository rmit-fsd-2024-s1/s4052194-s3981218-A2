import React from "react";
import client from "../services/client";
import gql from "graphql-tag";
import { useState, useEffect } from "react";
import { getAllReviews } from "../data/repository";
import { Bar, Pie } from "react-chartjs-2";
import PieChart from "../components/PieChart";
import BarChart from "../components/BarChart";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { calculateTheMostReview } from "../data/calculation";
const Dashboard = () => {
  const [showLatestReviews, setShowLatestReviews] = useState([]);
  const [latest, setLatest] = useState([]);
  const [barData, setBarData] = useState([]);
  const [barLabel, setBarLabels] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [pieLabel, setPieLabel] = useState([]);
  const [sortReviews, setSortReviews] = useState([]);
  //first get all data
  useEffect(() => {
    //initial stage so the admin can see the reviews after refreshing the page
    const fetchReviews = async () => {
      const getReviews = await getAllReviews();
      setShowLatestReviews(getReviews);
    };
    fetchReviews();
    const subscription = client
      .subscribe({
        query: gql`
          subscription {
            review_added {
              review_id
              comment
              product {
                product_id
                product_name
              }
              score
              user_id
            }
          }
        `,
      })
      .subscribe({
        next: (payload) => {
          const newReview = payload.data.review_added;
          setShowLatestReviews((prevReviews) => {
            const reviewExists = prevReviews.some(
              (review) => review.review_id === newReview.review_id
            );
            if (reviewExists) {
              return prevReviews;
            }
            return [...prevReviews, newReview];
          });
        },
      });

    return () => subscription.unsubscribe();
  }, []);
  //this part for the 3 recent reviews
  useEffect(() => {
    const temp = showLatestReviews.slice(showLatestReviews.length - 3);
    setLatest(temp);
    let sorted = calculateTheMostReview(showLatestReviews);
    setSortReviews(sorted);
  }, [showLatestReviews]);
  //set the charts data
  useEffect(() => {
    setPieData(sortReviews.map((e) => e[1].count));
    setBarData(sortReviews.map((e) => e[1].avg));
    setBarLabels(sortReviews.map((e) => e[0]));
    setPieLabel(sortReviews.map((e) => e[0]));
  }, [sortReviews]);
  return (
    <>
      <div className="d-flex">
        <div className="admin-container">
          <h2>3 Recent Reviews</h2>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Review ID</th>
                <th>Comment</th>
                <th>Product ID</th>
                <th>Score</th>
                <th>USER ID</th>
              </tr>
            </thead>
            <tbody>
              {latest.map((e) => {
                return (
                  <tr key={e.review_id}>
                    <td>{e.review_id}</td>
                    <td>{e.comment}</td>
                    <td>{e.product_id}</td>
                    <td>{e.score}</td>
                    <td>{e.user_id}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>{" "}
        <div className="w-100 admin-container mx-5">
          <h4>Distribution of Number of Reviews by Product</h4>
          <PieChart label={pieLabel} data={pieData} />
        </div>
      </div>
      <div className="admin-container my-5">
        <h2>THE HIGHEST AVERAGE RATING PRODUCTS (Top 10)</h2>
        <BarChart label={barLabel} data={barData} />
      </div>
    </>
  );
};

export default Dashboard;
