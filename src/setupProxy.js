const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://az-api.hexabase.com',
            changeOrigin: true,
            pathRewrite: {
                "^/api": "/api/v0",
            },
        })
    );
};