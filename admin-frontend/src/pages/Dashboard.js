import React from "react";
import client from "../services/client";
import gql from "graphql-tag";
import { useState, useEffect } from "react";
import { getAllReviews } from "../data/repository";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { calculateTheMostReview } from "../data/calculation";
const Dashboard = () => {
  const [showLatestReviews, setShowLatestReviews] = useState([]);
  const [latest, setLatest] = useState([]);
  const [data, setBardata] = useState([]);
  const [labels, setBarLabels] = useState([]);
  const [sortReviews, setSortReviews] = useState([]);
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
          console.log("new payload", payload.data);
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
  useEffect(() => {
    const temp = showLatestReviews.slice(showLatestReviews.length - 3);
    setLatest(temp);
    let sorted = calculateTheMostReview(showLatestReviews);
    setSortReviews(sorted);
  }, [showLatestReviews]);
  useEffect(() => {
    setBarLabels(sortReviews.map((e) => e[0]));
    setBardata(sortReviews.map((e) => e[1].avg));
  }, [sortReviews]);
  console.log(showLatestReviews)
  return (
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
      <Bar
        data={{
          labels: labels.slice(0, 5),
          datasets: [
            {
              label: "Rating",
              data: data.slice(0, 5),
              backgroundColor: ["rgba(43, 63, 229, 0.8)"],
              borderRadius: 5,
            },
          ],
        }}
        options={{
          plugins: {
            title: {
              text: "Revenue Source",
            },
          },
        }}
      />
    </div>
  );
};

export default Dashboard;
