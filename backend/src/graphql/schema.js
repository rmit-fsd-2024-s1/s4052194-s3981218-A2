const { buildSchema } = require('graphql');
const db = require('../database');

const schema = buildSchema(`
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
`);

const root = {
  users: async () => {
    return await db.user.findAll();
  },
  user: async ({ user_id }) => {
    return await db.user.findByPk(user_id);
  },
  blockUser: async ({ user_id }) => {
    const user = await db.user.findByPk(user_id);
    if (!user) throw new Error('User not found');
    user.blocked_status = true;
    await user.save();
    return user;
  },
  unblockUser: async ({ user_id }) => {
    const user = await db.user.findByPk(user_id);
    if (!user) throw new Error('User not found');
    user.blocked_status = false;
    await user.save();
    return user;
  },
};

module.exports = { schema, root };
