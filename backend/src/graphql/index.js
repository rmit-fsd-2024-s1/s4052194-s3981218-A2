const { gql } = require('apollo-server-express');
const db = require('../database');

const typeDefs = gql`
  type User {
    user_id: Int!
    username: String!
    email: String!
    date_joined: String!
    is_admin: Boolean!
    blocked_status: Boolean!
  }

  type Query {
    users: [User!]!
    user(user_id: Int!): User
  }

  type Mutation {
    blockUser(user_id: Int!): User
    unblockUser(user_id: Int!): User
  }
`;

const resolvers = {
  Query: {
    users: async () => {
      return await db.user.findAll();
    },
    user: async (parent, { user_id }) => {
      return await db.user.findByPk(user_id);
    },
  },
  Mutation: {
    blockUser: async (parent, { user_id }) => {
      const user = await db.user.findByPk(user_id);
      if (!user) throw new Error('User not found');
      user.blocked_status = true;
      await user.save();
      return user;
    },
    unblockUser: async (parent, { user_id }) => {
      const user = await db.user.findByPk(user_id);
      if (!user) throw new Error('User not found');
      user.blocked_status = false;
      await user.save();
      return user;
    },
  },
};

module.exports = { typeDefs, resolvers };
