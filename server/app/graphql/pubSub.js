const { PubSub } = require('graphql-subscriptions');

// TODO: This in-memory implementation will not scale. Move to something like Redis?

module.exports = new PubSub();
