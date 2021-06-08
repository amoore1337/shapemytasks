const { PubSub } = require('apollo-server-express');

// TODO: This in-memory implementation will not scale. Move to something like Redis?

module.exports = new PubSub();
