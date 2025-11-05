const { createRequestHandler } = require('@react-router/node');
module.exports = createRequestHandler({
  build: require('../build/server/index.js')
});
