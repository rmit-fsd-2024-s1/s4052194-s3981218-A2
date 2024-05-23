import React from 'react'
import { useReducer,useEffect ,useState} from 'react';
import { getAllReviews } from '../../services/reviewService';
import { reviewReducer } from '../reducer/reviewReducer';
const initialState = {
    reviews: [],
  };

const useReview = () => {
    const [state, dispatch] = useReducer(reviewReducer, initialState);
    const [loadingReview,setLoading] = useState(true);

    useEffect(() => {
        const fetchInitData = async () => {
          try {
            const reviews = await getAllReviews();
            dispatch({
                type: "InitReviews",
                payload: {
                  reviews: reviews,
                },
              });
          } catch (err) {
            console.log(err);
          } finally {
            setLoading(false);
          }
        };
        fetchInitData();
        //fetch api reviews
      }, []);
const getReviewByProductId = (id) => {
    console.log(state.reviews)
    const reviews = state.reviews.filter((r)=>{
        return r.product_id === id
    })
    return reviews;
}
  return {state,loadingReview,getReviewByProductId}
}



export default useReview

