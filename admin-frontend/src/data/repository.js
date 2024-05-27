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

// --- Products -----------------------------------------------------------------------------------

export async function getProducts() {
  const query = gql`
    query {
      products {
        product_id
        product_name
        product_price
        product_stock
        product_image
        is_special
      }
    }
  `;

  const data = await request(GRAPH_QL_URL, query);
  return data.products;
}

export async function getProduct(product_id) {
  const query = gql`
    query ($product_id: Int!) {
      product(product_id: $product_id) {
        product_id
        product_name
        product_price
        product_stock
        product_image
        is_special
      }
    }
  `;

  const data = await request(GRAPH_QL_URL, query, { product_id });
  return data.product;
}

export async function createProduct(product) {
  const mutation = gql`
    mutation ($product_name: String!, $product_price: Float!, $product_image: String!, $product_stock: Int!) {
      createProduct(product_name: $product_name, product_price: $product_price, product_image: $product_image, product_stock: $product_stock) {
        product_id
        product_name
        product_price
        product_stock
        product_image
        is_special
      }
    }
  `;

  const data = await request(GRAPH_QL_URL, mutation, product);
  return data.createProduct;
}

export async function updateProduct(product_id, product) {
  const mutation = gql`
    mutation ($product_id: Int!, $product_name: String!, $product_price: Float!, $product_image: String!, $product_stock: Int!) {
      updateProduct(product_id: $product_id, product_name: $product_name, product_price: $product_price, product_image: $product_image, product_stock: $product_stock) {
        product_id
        product_name
        product_price
        product_stock
        product_image
        is_special
      }
    }
  `;

  const data = await request(GRAPH_QL_URL, mutation, { product_id, ...product });
  return data.updateProduct;
}

export async function deleteProduct(product_id) {
  const mutation = gql`
    mutation ($product_id: Int!) {
      deleteProduct(product_id: $product_id) {
        product_id
      }
    }
  `;

  const data = await request(GRAPH_QL_URL, mutation, { product_id });
  return data.deleteProduct;
}

export async function markSpecialProduct(product_id) {
  const mutation = gql`
    mutation ($product_id: Int!) {
      markSpecialProduct(product_id: $product_id) {
        product_id
        is_special
      }
    }
  `;

  const data = await request(GRAPH_QL_URL, mutation, { product_id });
  return data.markSpecialProduct;
}

export async function unmarkSpecialProduct(product_id) {
  const mutation = gql`
    mutation ($product_id: Int!) {
      unmarkSpecialProduct(product_id: $product_id) {
        product_id
        is_special
      }
    }
  `;

  const data = await request(GRAPH_QL_URL, mutation, { product_id });
  return data.unmarkSpecialProduct;
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
