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

// 

export async function createOwner() {
  //
}

export async function getOwnerExists() {
  //
}

export async function getOwner() {
  //
}

export async function updateOwner() {
  //
}

export async function getOwners() {
  //
}

export async function deleteOwner() {
  // 
}
