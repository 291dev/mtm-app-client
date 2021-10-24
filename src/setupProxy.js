const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(createProxyMiddleware("/api/v1/auth/", { target: "http://localhost:6080/" }));
  app.use(createProxyMiddleware("/api/v1/", { target: "http://localhost:7080/" }));
};