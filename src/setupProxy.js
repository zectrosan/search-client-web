const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(proxy('/api/search', { target: 'http://localhost:1729/' }));
  app.use(proxy('/api/database', { target: 'http://localhost:5000/', pathRewrite: {'^/api/database' : ''} }));
};
