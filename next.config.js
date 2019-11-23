const withCss = require('@zeit/next-css');

// next.config.js
module.exports = withCss({
  target: 'serverless',
  env: {
    RZP_LIVE_KEY: process.env.RZP_LIVE_KEY,
    RZP_TEST_KEY: process.env.RZP_TEST_KEY,
  },
});
