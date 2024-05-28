const { gql } = require("apollo-server-express");
const { PubSub } = require("graphql-subscriptions");
const db = require("../database");

const pubsub = new PubSub();

//new review tracking
const REVIEW_ADDED_TRIGGER = "REVIEW_ADDED";

// defining the schema

const typeDefs = gql(`
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
    is_special: Boolean!
  }

  type Review {
    review_id: Int!
    comment: String!
    product_id: Int!
    score:Int
    user_id: Int!
    user:User
    product:Product
  }

  type Query {
    users: [User!]!
    user(user_id: Int!): User
    reviews: [Review!]!
    products: [Product!]!
    product(product_id: Int!): Product
  }

  type Mutation {
    blockUser(user_id: Int!): User
    unblockUser(user_id: Int!): User
    deleteReview(review_id: Int!): Review
    createReview(user_id:Int!,product_id:Int!,score:Int,comment:String!):Review
    createProduct(product_name: String!, product_price: Float!, product_image: String!, product_stock: Int!): Product
    updateProduct(product_id: Int!, product_name: String!, product_price: Float!, product_image: String!, product_stock: Int!): Product
    deleteProduct(product_id: Int!): Product
    markSpecialProduct(product_id: Int!): Product
    unmarkSpecialProduct(product_id: Int!): Product
  }
  type Subscription {
    review_added:Review!
  }
`);

const resolvers = {
  Query: {
    users: async () => await db.user.findAll(),
    user: async (parent, { user_id }) => await db.user.findByPk(user_id),
    reviews: async () =>
      await db.review.findAll({ include: [db.user, db.product] }),
    products: async () => {
      const products = await db.product.findAll();
      const specialProducts = await db.special_product.findAll();
      const specialProductIds = specialProducts.map((sp) => sp.product_id);

      return products.map((product) => ({
        ...product.toJSON(),
        is_special: specialProductIds.includes(product.product_id),
      }));
    },
    product: async (parent, { product_id }) => {
      const product = await db.product.findByPk(product_id);
      if (!product) return null;
      const specialProduct = await db.special_product.findOne({
        where: { product_id },
      });
      return {
        ...product.toJSON(),
        is_special: !!specialProduct,
      };
    },
  },
  Mutation: {
    blockUser: async (parent, { user_id }) => {
      const user = await db.user.findByPk(user_id);
      if (!user) throw new Error("User not found");
      user.blocked_status = true;
      await user.save();
      return user;
    },
    unblockUser: async (parent, { user_id }) => {
      const user = await db.user.findByPk(user_id);
      if (!user) throw new Error("User not found");
      user.blocked_status = false;
      await user.save();
      return user;
    },
    createReview: async (parent, { user_id, product_id, score, comment }) => {
      const review = await db.review.create({
        user_id: user_id,
        product_id: product_id,
        score: score,
        comment: comment,
      });
      pubsub.publish(REVIEW_ADDED_TRIGGER, { review_added: review });

      return review;
    },
    deleteReview: async (parent, { review_id }) => {
      const review = await db.review.findByPk(review_id);
      if (!review) throw new Error("Review not found");
      review.comment = "**** This review has been deleted by the admin ****";
      await review.save();
      return review;
    },
    createProduct: async (
      parent,
      { product_name, product_price, product_image, product_stock }
    ) => {
      return await db.product.create({
        product_name,
        product_price,
        product_image,
        product_stock,
      });
    },
    updateProduct: async (
      parent,
      { product_id, product_name, product_price, product_image, product_stock }
    ) => {
      const product = await db.product.findByPk(product_id);
      if (!product) throw new Error("Product not found");
      product.product_name = product_name;
      product.product_price = product_price;
      product.product_image = product_image;
      product.product_stock = product_stock;
      await product.save();
      return product;
    },
    deleteProduct: async (parent, { product_id }) => {
      const product = await db.product.findByPk(product_id);
      if (!product) throw new Error("Product not found");
      await product.destroy();
      return product;
    },
    markSpecialProduct: async (parent, { product_id }) => {
      await db.special_product.create({ product_id });
      const product = await db.product.findByPk(product_id);
      return {
        ...product.toJSON(),
        is_special: true,
      };
    },
    unmarkSpecialProduct: async (parent, { product_id }) => {
      const specialProduct = await db.special_product.findOne({
        where: { product_id },
      });
      if (!specialProduct) throw new Error("Special Product not found");
      await specialProduct.destroy();
      const product = await db.product.findByPk(product_id);
      return {
        ...product.toJSON(),
        is_special: false,
      };
    },
  },
  Subscription: {
    review_added: {
      subscribe: () => pubsub.asyncIterator(REVIEW_ADDED_TRIGGER),
    },
  },
};

module.exports = { typeDefs, resolvers };
