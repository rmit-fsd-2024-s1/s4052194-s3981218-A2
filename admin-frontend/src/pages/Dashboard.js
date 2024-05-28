import React from "react";
import client from "../services/client";
import gql from "graphql-tag";
import { useState, useEffect } from "react";
const Dashboard = () => {
  const [showLatestReviews, setShowLatestReviews] = useState([]);

  useEffect(() => {
    const subscription = client
      .subscribe({
        query: gql`
          subscription {
            review_added {
              review_id
              comment
              product_id
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
            if (prevReviews.length === 3) {
              const newReviews = prevReviews.slice(1);
              return [...newReviews, newReview];
            }
            return [...prevReviews, newReview];
          });
        },
      });
  }, []);
  console.log("latest", showLatestReviews);

  return (
    <div>
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
            {showLatestReviews.map((e) => {
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
      </div>
    </div>
  );
};

export default Dashboard;
