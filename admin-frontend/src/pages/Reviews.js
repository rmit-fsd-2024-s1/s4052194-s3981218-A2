import React, { useEffect, useState } from 'react';
import { getReviews, deleteReview } from '../data/repository';
import '../style/Reviews.css';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getReviews();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  const handleDeleteReview = async (review_id) => {
    try {
      await deleteReview(review_id);
      const updatedReviews = reviews.map(review =>
        review.review_id === review_id
          ? { ...review, comment: '**** This review has been deleted by the admin ****' }
          : review
      );
      setReviews(updatedReviews);
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  return (
    <div className="admin-container">
      <h2>Reviews Management</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Product</th>
            <th>Comment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review.review_id}>
              <td>{review.user.username}</td>
              <td>{review.product.product_name}</td>
              <td>{review.comment}</td>
              <td>
                <button onClick={() => handleDeleteReview(review.review_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reviews;
