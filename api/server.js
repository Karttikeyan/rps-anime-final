import { createRequestHandler } from '@react-router/node';

export default createRequestHandler({
  build: await import('../build/server/index.js')
});
