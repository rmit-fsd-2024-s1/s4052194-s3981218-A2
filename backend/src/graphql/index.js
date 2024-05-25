const { buildSchema } = require("graphql");
const db = require("../database");

// defining the schema
const schema = buildSchema(`
  type User {
    user_id: Int!
    username: String!
    email: String!
    blocked_status: Boolean!
  }

  type Query {
    getUsers: [User]
    getUserById(user_id: Int!): User
  }

  type Mutation {
    blockUser(user_id: Int!): User
    unblockUser(user_id: Int!): User
  }
`);

// Define your resolvers
const root = {
  getUsers: async () => {
    return await db.user.findAll();
  },
  getUserById: async ({ user_id }) => {
    return await db.user.findByPk(user_id);
  },
  blockUser: async ({ user_id }) => {
    await db.user.update({ blocked_status: true }, { where: { user_id } });
    return await db.user.findByPk(user_id);
  },
  unblockUser: async ({ user_id }) => {
    await db.user.update({ blocked_status: false }, { where: { user_id } });
    return await db.user.findByPk(user_id);
  },
};

module.exports = { schema, root };
