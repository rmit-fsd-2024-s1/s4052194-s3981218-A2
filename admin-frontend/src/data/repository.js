import { request, gql } from "graphql-request";

// --- Constants ----------------------------------------------------------------------------------
const GRAPH_QL_URL = "http://localhost:4000/graphql";

// --- Owner ---------------------------------------------------------------------------------------
async function getOwners() {
  // Simply query with no parameters.
  const query = gql`
    {
      all_owners {
        email,
        first_name,
        last_name,
        pets {
          pet_id,
          name
        }
      }
    }
  `;

  const data = await request(GRAPH_QL_URL, query);

  return data.all_owners;
}

async function getOwner(email) {
  // Query with parameters (variables).
  const query = gql`
    query ($email: String) {
      owner(email: $email) {
        email,
        first_name,
        last_name
      }
    }
  `;

  const variables = { email };

  const data = await request(GRAPH_QL_URL, query, variables);

  return data.owner;
}

async function getOwnerExists(email) {
  const query = gql`
    query ($email: String) {
      owner_exists(email: $email)
    }
  `;

  const variables = { email };

  const data = await request(GRAPH_QL_URL, query, variables);

  return data.owner_exists;
}

async function createOwner(owner) {
  const query = gql`
    mutation ($email: String, $first_name: String, $last_name: String) {
      create_owner(input: {
        email: $email,
        first_name: $first_name,
        last_name: $last_name
      }) {
        email,
        first_name,
        last_name
      }
    }
  `;

  const variables = owner;

  const data = await request(GRAPH_QL_URL, query, variables);

  return data.create_owner;
}

async function updateOwner(owner) {
  const query = gql`
    mutation ($email: String, $first_name: String, $last_name: String) {
      update_owner(input: {
        email: $email,
        first_name: $first_name,
        last_name: $last_name
      }) {
        email,
        first_name,
        last_name
      }
    }
  `;

  const variables = owner;

  const data = await request(GRAPH_QL_URL, query, variables);

  return data.update_owner;
}

async function deleteOwner(email) {
  const query = gql`
    mutation ($email: String) {
      delete_owner(email: $email)
    }
  `;

  const variables = { email };

  const data = await request(GRAPH_QL_URL, query, variables);

  return data.delete_owner;
}

export {
  getOwners, getOwner, getOwnerExists, createOwner, updateOwner, deleteOwner
}
