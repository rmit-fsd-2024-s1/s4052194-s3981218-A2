import { request, gql } from 'graphql-request';

// --- Constants ----------------------------------------------------------------------------------
const GRAPH_QL_URL = "http://localhost:4000/graphql";

// --- Users --------------------------------------------------------------------------------------

export async function getUsers() {
  const query = gql`
    query {
      users {
        user_id
        username
        email
        blocked_status
      }
    }
  `;

  const data = await request(GRAPH_QL_URL, query);
  return data.users;
}

export async function blockUser(user_id) {
  const mutation = gql`
    mutation ($user_id: Int!) {
      blockUser(user_id: $user_id) {
        user_id
        blocked_status
      }
    }
  `;

  const data = await request(GRAPH_QL_URL, mutation, { user_id });
  return data.blockUser;
}

export async function unblockUser(user_id) {
  const mutation = gql`
    mutation ($user_id: Int!) {
      unblockUser(user_id: $user_id) {
        user_id
        blocked_status
      }
    }
  `;

  const data = await request(GRAPH_QL_URL, mutation, { user_id });
  return data.unblockUser;
}

// --- Reviews ------------------------------------------------------------------------------------

export async function getReviews() {
  const query = gql`
    query {
      reviews {
        review_id
        comment
        product {
          product_name
        }
        user {
          username
        }
      }
    }
  `;

  const data = await request(GRAPH_QL_URL, query);
  return data.reviews;
}

export async function deleteReview(review_id) {
  const mutation = gql`
    mutation ($review_id: Int!) {
      deleteReview(review_id: $review_id) {
        review_id
        comment
      }
    }
  `;

  const data = await request(GRAPH_QL_URL, mutation, { review_id });
  return data.deleteReview;
}

// --- Owners -------------------------------------------------------------------------------------

export async function createOwner() {
  // Implement your GraphQL mutation here
}

export async function getOwnerExists() {
  // Implement your GraphQL query here
}

export async function getOwner() {
  // Implement your GraphQL query here
}

export async function updateOwner() {
  // Implement your GraphQL mutation here
}

export async function getOwners() {
  // Implement your GraphQL query here
}

export async function deleteOwner() {
  // Implement your GraphQL mutation here
}
