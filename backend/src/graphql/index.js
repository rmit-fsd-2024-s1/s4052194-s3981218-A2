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

  type Product {
    product_id: Int!
    product_name: String!
    product_price: Float!
    product_stock: Int!
    product_image: String!
  }

  type Review {
    review_id: Int!
    comment: String!
    product: Product!
    user: User!
  }

  type Query {
    users: [User!]!
    user(user_id: Int!): User
    reviews: [Review!]!
  }

  type Mutation {
    blockUser(user_id: Int!): User
    unblockUser(user_id: Int!): User
    deleteReview(review_id: Int!): Review
  }
`;

const resolvers = {
  Query: {
    users: async () => await db.user.findAll(),
    user: async (parent, { user_id }) => await db.user.findByPk(user_id),
    reviews: async () => await db.review.findAll({ include: [db.user, db.product] }),
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
    deleteReview: async (parent, { review_id }) => {
      const review = await db.review.findByPk(review_id);
      if (!review) throw new Error('Review not found');
      review.comment = '**** This review has been deleted by the admin ****';
      await review.save();
      return review;
    }
  }
};

module.exports = { typeDefs, resolvers };
