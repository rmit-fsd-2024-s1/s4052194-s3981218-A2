import React from "react";
import client from "../services/client";
import gql from "graphql-tag";

const Dashboard = () => {
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
        console.log(payload);
      },
    });
    
  return <div>Dashboard</div>;
};

export default Dashboard;
